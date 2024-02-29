import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  closeIcon = faTimes;
  taskId: number = 0;
  taskDesc: string = '';
  status: string = '';
  form: FormGroup;
  loading: Boolean = false;

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router) {
    this.form = this.fb.group({
      status: ['', Validators.required],
      taskDesc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    console.log(this.status);
    this.form.controls['taskDesc'].setValue(this.taskDesc);
    if(this.status == 'WORKING') {
      this.form.controls['status'].setValue("WFO");  
    } else if(this.status == 'HDL') {
      this.form.controls['status'].setValue("HDL+WFO");  
    } else {
      this.form.controls['status'].setValue(this.status);
    }
  }

  updateTaskDetails(event: any) {
    if(event.target.value == 'FDL') {
      this.form.controls['taskDesc'].setValue("On Leave");
    } else {
      this.form.controls['taskDesc'].setValue("");
    }
  }

  updateTask() {
    if(this.form.valid) {
        this.taskService.updateTask(this.taskId,  this.form.controls['taskDesc'].value, this.form.controls['status'].value)
      .subscribe((data: boolean) => {
        console.log(data);
        this.loading = false;
        this.activeModal.close(true);
      });
    } else {
      alert('Status or task details can not be blank');
    }
    
    console.log('Updating Task : ' + this.form.controls['taskDesc'].value);
  }

}
