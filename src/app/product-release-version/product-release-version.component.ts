import { Component, OnInit, Input } from '@angular/core';
import { BuildApiService } from '../build-api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product, Version, Release, Build } from '../product';

@Component({
    selector: 'app-product-release-version',
    templateUrl: './product-release-version.component.html',
    styleUrls: ['./product-release-version.component.css']
})
export class ProductReleaseVersionComponent implements OnInit {
    @Input() product: string;
    @Input() release: string;
    @Input() versions: string[];
    @Input() release_obj: Release;
    @Input() nested: boolean;
    
    
    constructor(private route: ActivatedRoute,
            private buildApiService: BuildApiService,
            private location: Location) {
    }
    
    ngOnInit() {
        var _this = this;
        //console.log("Got release_obj: " + JSON.stringify(this.release_obj));
        if (this.release_obj) {
            this.product = this.release_obj.product_name;
            this.release = this.release_obj.name;
            this.versions = [];
            if (this.release_obj.versions)
                this.release_obj.versions.forEach(function (version) {_this.versions.push(version.name)});
        }
        else {
            if (!this.product)
                this.product = this.route.snapshot.paramMap.get('id');
            if (!this.release)
                this.release = this.route.snapshot.paramMap.get('releaseId');
            if (!this.versions)
                this.buildApiService.getProductReleaseVersions(this.product,this.release)
                .subscribe(res => this.versions = res);
        }
    }
    
    encode(input: string): string {return(encodeURIComponent(input));}
    
    getPath(versionName): string {
        return(this.encode(this.product + ',' + this.release + ',' + versionName));
    }
}
