import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project';
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { ConfirmDialogService } from '../shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  spinnerIcon = faSpinner;
  plusIcon = faPlus;
  projects: Project[] = [];
  loading = false;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService) { 
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.loading = true;
    this.projectService.getAllProjects().subscribe((data: Project[]) => {
      this.projects = data;
      this.loading = false;
    });
  }

  openAddProjectModal() {
    const modalRef = this.modalService.open(AddProjectComponent, {
      size: 'md', centered: true
    });
    modalRef.result.then((result) => {
      console.log('result of add project : ' + result);
      if (result === true) {
        this.getAllProjects();
      }
    }).catch((err) => {
      console.log('add-project modal dismissed');
    });
  }

  public openDeleteConfirmationDialog(projectId: string) {
    this.confirmDialogService.confirm('Project Deletion', 'Along with this project, all the employees under project \'' + projectId + '\' as well as their tasks will be deleted. Do you really want to delete project \'' + projectId + '\'? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.deleteProject(projectId);
        }
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteProject(projectId: string) {
    this.loading = true;
    this.projectService.deleteProject(projectId).subscribe(data => {
      if(data === true) {
        this.getAllProjects();
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

}
