import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '../project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Input() projects: Project[] = [];
  @Output() deleteProject = new EventEmitter<string>();

  constructor(
    public router: Router
  ) { 
    
  }

  ngOnInit(): void {
  }

  viewProjectTasks(projectId: any) {
    this.router.navigate(['projects', projectId]);
  }

  onClickDeleteProject(projectId: any) {
    this.deleteProject.emit(projectId);
  }

}
