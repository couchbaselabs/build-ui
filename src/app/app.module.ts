import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';

import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ProductReleaseComponent } from './product-release/product-release.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProductReleaseVersionComponent } from './product-release-version/product-release-version.component';
import { VersionBuildsComponent } from './version-builds/version-builds.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductReleaseComponent,
    ProjectsComponent,
    ProductReleaseVersionComponent,
    VersionBuildsComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
