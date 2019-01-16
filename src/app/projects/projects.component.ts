import { Component, OnInit } from '@angular/core';
import { BuildApiService } from '../build-api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projects: string[];

  constructor(private buildApiService: BuildApiService) { }

  getProjects(): void {this.projects = ['loading projects...']; this.buildApiService.getProjects().subscribe(projects => this.projects = projects);}

  ngOnInit() {
      this.getProjects();
  }

}
