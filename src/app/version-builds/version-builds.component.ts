import { Component, OnInit, Input } from '@angular/core';
import { BuildApiService } from '../build-api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product, Version, Release, Build } from '../product';

@Component({
  selector: 'app-version-builds',
  templateUrl: './version-builds.component.html',
  styleUrls: ['./version-builds.component.css']
})
export class VersionBuildsComponent implements OnInit {
    @Input() product: string;
    @Input() release: string;
    @Input() version: string;
    @Input() builds: Build[];
    
    selectedBuilds: Object;
    updateBuilds: Function;
   
   getUpdateBuilds() {var _this = this; return function(newBuild) {_this.builds.push(newBuild);};}
    
  constructor(private route: ActivatedRoute,
          private buildApiService: BuildApiService,
          private location: Location) { }

  ngOnInit() {
      this.selectedBuilds = {};
      this.builds = [];

      // get the parameters
      if (!this.product)
          this.product = this.route.snapshot.paramMap.get('id');
      if (!this.release)
          this.release = this.route.snapshot.paramMap.get('releaseId');
      if (!this.version)
          this.version = this.route.snapshot.paramMap.get('versionId');
      
      // need to subscribe to changes in router events
      this.route.params.subscribe((params) =>{
          this.updateParams(params);
      });
      
      //console.log("Got id: " + this.product + ", release: " + this.release + ", version: " + this.version);
      if (!this.builds && this.product && this.product != "0" && this.release && this.version)
          this.buildApiService.getVersionBuilds2(this.product,this.release,this.version,
                  this.getUpdateBuilds());

  }
  
  
  //
  // change in parameters
  //
  
  updateParams(params) {
      //console.log("Got params: " + JSON.stringify(params));

      this.builds.length = 0;
      this.selectedBuilds = {};
      
      this.product = params.id;
      this.release = params.releaseId;
      this.version = params.versionId;
      
      if (this.product && this.product != "0" && this.release && this.version)
         this.buildApiService.getVersionBuilds2(this.product,this.release,this.version,
                 this.getUpdateBuilds());      
  }
  
  getColor(build)         {return this.isSelectedBuild(build) ? 'blue' : build.timestamp > 0 ? 'green' : 'red'}
  getSelectedBuilds()     {return Object.keys(this.selectedBuilds);}
  isSelectedBuild(build)  {return (this.selectedBuilds[build.name] != null);}
  selectBuild(build)   {
      if (!this.selectedBuilds[build.name])
          this.selectedBuilds[build.name] = build;
      else
          delete this.selectedBuilds[build.name];
  }
  unSelectBuild(buildNum) {delete this.selectedBuilds[buildNum];}

}
