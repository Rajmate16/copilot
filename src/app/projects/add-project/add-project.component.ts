import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  spinnerIcon = faSpinner;
  closeIcon = faTimes;
  form: FormGroup;
  loading: Boolean = false;
  submitted: Boolean = false;
  projectExists = false;
  mode: string = 'add';
  
  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private datePipe: DatePipe,
    private router: Router) {
    this.form = this.fb.group({
      projectId: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      projectName: ['', [Validators.required, Validators.maxLength(150)]],
      manager: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }
  
  public get f() { return this.form.controls; }

  ngOnInit(): void {
  }

  addProject() {
    this.submitted = true;
    this.projectExists = false;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const val = this.form.value;
    this.loading = true;

    const projectToAdd: Project = new Project();
    projectToAdd.projectId = val.projectId;
    projectToAdd.projectName = val.projectName;
    projectToAdd.manager = val.manager;
    
    this.projectService.addProject(projectToAdd)
      .subscribe(
        (data) => {
          console.log(data);
          if (data === true) {
            this.loading = false;
            this.projectExists = false;
            this.activeModal.close(true);
          } else {
            this.loading = false;
            console.log('Duplicate Project');
            this.projectExists = true;
          }
        }
      );
  }

}
