import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, mergeMap} from 'rxjs/operators';
import { Product, Version, Release, Build } from './product';

const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseUrl = "/v1/";

export class Dummy {
    products: string[]; 
releases: string[];
projects: string[];
builds: string[];
versions: string[];
}

@Injectable({
    providedIn: 'root'
})
export class BuildApiService {
    currentProducts: Product[];
    currentBuilds: Build[];

constructor(private http: HttpClient) {this.currentProducts = new Array(); this.currentBuilds = new Array();}

getProducts2(openProduct: string, openRelease: string): Product[] {
        var _this = this;
        this.currentProducts.length = 0;
        
        this.http.get<Dummy>(baseUrl + 'products')
        .subscribe((resp: Dummy) => 
        {
            resp.products.forEach(function (name) {
                if (name.indexOf('/') != -1)
                    return;
                var new_prod = new Product(name);
                if (name == openProduct)
                    new_prod.expanded = true;
                _this.currentProducts.push(new_prod);
                _this.getProductReleases2(new_prod, (name == openProduct ? openRelease : null));
            });
            
        });
        
        return(this.currentProducts);
}

getProductReleases(product: string): Observable<string[]> {
    return this.http.get<Dummy>(baseUrl + 'products/' + this.encode(product) + '/releases')
    .pipe(map(resp => resp.releases));
}

getProductReleases2(product: Product, openRelease: string): void {
    var _this = this;
    product.releases = new Array();
    
    this.http.get<Dummy>(baseUrl + 'products/' + this.encode(product.name) + '/releases')
    .pipe(catchError(this.handleError('getProductReleases2',[])))
    .subscribe((resp: Dummy) =>
    {
        if (resp.releases) resp.releases.forEach(function (release) {
            var rel = new Release(product.name,release);
            if (openRelease && release == openRelease)
                setTimeout(_this.updateExpanded(rel),500);
            product.releases.push(rel);
            _this.getProductReleaseVersions2(product,rel);
        })
    });
}

updateExpanded(rel: Release) {
    return function() {rel.expanded = true;};
}

getProductReleaseVersions(product: string,release: string): Observable<string[]> {
    return this.http.get<Dummy>(baseUrl + 'products/' + this.encode(product) + '/releases/' + 
            this.encode(release) + '/versions')
            .pipe(map(resp => resp.versions));
}

getProductReleaseVersions2(product: Product,release: Release): void {
    this.http.get<Dummy>(baseUrl + 'products/' + this.encode(product.name) + '/releases/' + 
            this.encode(release.name) + '/versions')
            .pipe(catchError(this.handleError('getProductReleaseVersion2',[])))
            .subscribe((resp: Dummy) =>
            {
                if (resp.versions) resp.versions.forEach(function (version) {
                    var newVersion = new Version(product.name,release.name,version);
                    release.versions.push(newVersion);
                });
            });
}

getVersionBuilds(product: string,release: string, version: string): Observable<string[]> {
    return this.http.get<Dummy>(baseUrl + 'products/' + this.encode(product) + '/releases/' + 
            this.encode(release) + '/versions/' + this.encode(version) + '/builds')
            .pipe(map(resp => resp.builds.reverse()));
}

getVersionBuilds2(product: string,release: string, version: string, addNewBuild: Function) {
        var _this = this;
       // this.currentBuilds.length = 0;
       // builds.length = 0;
        
        this.http.get<Dummy>(baseUrl + 'products/' + this.encode(product) + '/releases/' + 
                this.encode(release) + '/versions/' + this.encode(version) + '/builds')
                .subscribe(resp => {
                    resp.builds.reverse().forEach(function (buildName) {
                        var newBuild = new Build(product,release,version,buildName);
                        addNewBuild(newBuild);
                        setTimeout(_this.updateBuildDetails(newBuild),100);
                    });
                    
                });
        
        //return(this.currentBuilds);
}

updateBuildDetails(build: Build) {
    var _this = this;
    return function() {_this.getBuildDetails(build)};
}

getBuildDetails(build: Build) {
    this.http.get(baseUrl + 'products/' + this.encode(build.product) + '/releases/' + this.encode(build.release) +
            '/versions/' + this.encode(build.version) + '/builds/' + this.encode(build.name))
    .pipe(catchError(this.handleError('getBuildDetails',[])))
    .subscribe((resp : any)=>
         {
             //console.log("Got build resp:" + JSON.stringify(resp));
             build.prev_build_num = resp.prev_build_num;
             build.new_commits = resp.new_commits;
             build.timestamp = resp.timestamp;
             build.timestamp_date = new Date(resp.timestamp*1000);
             build.download_url = resp.download_url;
         });

}

getProjects(): Observable<string[]> {
    return this.http.get<Dummy>(baseUrl + 'projects')
    .pipe(map(resp => resp.projects));
}

encode(input: string): string {return(encodeURIComponent(input));}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        
        //console.error(error); // log to console instead
        
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
        
        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
}

}
