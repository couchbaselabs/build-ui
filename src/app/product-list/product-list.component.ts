import { Component, OnInit, Input } from '@angular/core';
import { BuildApiService } from '../build-api.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Version, Release } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    openProduct: string;
    openRelease: string;
    openVersion: string;
    products: Product[];

    getProducts(): void {
        this.products = this.buildApiService.getProducts2(this.openProduct, this.openRelease);
    }

    constructor(private route: ActivatedRoute,
            private buildApiService: BuildApiService) { }

    ngOnInit() {
        var openPaths = this.route.snapshot.paramMap.get('openPaths');
        if (openPaths && openPaths.length) {
            var openPathsArr = decodeURIComponent(this.route.snapshot.paramMap.get('openPaths')).split(',');
            if (openPathsArr.length > 0 && openPathsArr[0])
                this.openProduct = openPathsArr[0];
            if (openPathsArr.length > 1 && openPathsArr[1])
                this.openRelease = openPathsArr[1];
            if (openPathsArr.length > 2 && openPathsArr[2])
                this.openVersion = openPathsArr[2];
        }
      this.getProducts();
    }

    encode(input: string): string {return(encodeURIComponent(input));}
}
