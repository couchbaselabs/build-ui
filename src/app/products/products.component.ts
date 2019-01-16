import { Component, OnInit, Input } from '@angular/core';
import { BuildApiService } from '../build-api.service';
import { Product, Version, Release } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    constructor(private buildApiService: BuildApiService) { }

    ngOnInit() {}
}
