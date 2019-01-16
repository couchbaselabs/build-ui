import { Component, OnInit, Input } from '@angular/core';
import { BuildApiService } from '../build-api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-product-release',
    templateUrl: './product-release.component.html',
    styleUrls: ['./product-release.component.css']
})
export class ProductReleaseComponent implements OnInit {
    @Input() product: string;
    @Input() releases: string[];
    @Input() nested: boolean;
    
    constructor(private route: ActivatedRoute,
            private buildApiService: BuildApiService,
            private location: Location) { }
    
    ngOnInit() {
        this.getReleases();
    }
    
    getReleases(): void {
        if (!this.product)
            this.product = this.route.snapshot.paramMap.get('id');
        if (!this.releases)
            this.buildApiService.getProductReleases(this.product).subscribe(res => this.releases = res);
    }
    
    
    encode(input: string): string {return(encodeURIComponent(input));}
}

