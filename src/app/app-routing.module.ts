import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductReleaseComponent } from './product-release/product-release.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductReleaseVersionComponent } from './product-release-version/product-release-version.component';
import { VersionBuildsComponent } from './version-builds/version-builds.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  /*{ path: '', redirectTo: '/products', pathMatch: 'full' },*/
  { path: 'products', component: ProductsComponent, children: [
      { path: 'list/:openPaths', component: ProductListComponent, outlet: 'listOutlet' },
      { path: 'prod/:id/release/:releaseId/version/:versionId', component: VersionBuildsComponent, outlet: 'detailOutlet'},
  ]},
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full'}
  
  /*{ path: 'products/:id', component: ProductReleaseComponent, pathMatch: 'full'},
    { path: 'products/:id/releases/:releaseId/versions/:versionId', component: VersionBuildsComponent, pathMatch: 'full'},
    { path: 'products/:id/releases/:releaseId', component: ProductReleaseVersionComponent, pathMatch: 'full'}*/
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
  })
export class AppRoutingModule { }
