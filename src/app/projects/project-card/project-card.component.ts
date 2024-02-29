import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  editIcon = faEdit;
  deleteIcon = faTrashAlt;

  @Input()
  project: Project = new Project;

  @Output() viewProjectTasks = new EventEmitter<string>();
  @Output() deleteProject = new EventEmitter<string>();
  
  constructor(private confirmDialogService: ConfirmDialogService) { 
    
  }

  ngOnInit(): void {

  }

  openEditProjectModal() {

  }

  onClickDeleteProject(projectId: string) {
    this.deleteProject.emit(projectId);
  }

  // public openDeleteConfirmationDialog(projectId: string, projectName: string) {
  //   this.confirmDialogService.confirm('Project Deletion', 'Do you really want to delete project \'' + projectName + '\'?')
  //     .then((confirmed) => {
  //       if (confirmed === true) {
  //         this.deleteProject(projectId);
  //       }
  //     }
  //     )
  //     .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  // }

  onClickViewProjectTasks(projectId: string) {
    this.viewProjectTasks.emit(projectId);
  }

  

}
