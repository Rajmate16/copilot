import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import { Task } from '../task';

@Component({
  selector: 'app-export-tasks',
  templateUrl: './export-tasks.component.html',
  styleUrls: ['./export-tasks.component.css']
})
export class ExportTasksComponent implements OnInit {

  spinnerIcon = faSpinner;
  closeIcon = faTimes;
  form: FormGroup;
  loading: Boolean = false;
  projectId = '';
  
  maxDate  = new DatePipe('en-US').transform(Date.now(), 'yyyy-MM-dd');
  today = new DatePipe('en-US').transform(Date.now(), 'YYYY-MM-DD');

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private router: Router) {
    this.form = this.fb.group({
      attendanceDate: [this.maxDate, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  export() {
    console.log('Export Started');
    const attendanceDate = this.datePipe.transform(this.form.controls['attendanceDate'].value, 'dd/MM/yyyy');
    console.log(attendanceDate);
    if(attendanceDate === null) {
      console.log('attendanceDate is null. returning');
      alert('Attendance date can not be blank');
      return;
    }
    this.loading = true;
    this.taskService.export(attendanceDate, this.projectId)
    .subscribe((data: any) => {
      this.loading = false;
      const blob = new Blob([data], { type: 'application/ms-excel' });
      saveAs(blob, 'Cybage_WFHDetails.xlsx');
      this.activeModal.close(true);
    }, (err) => {
      this.loading = false;
      alert('Make sure you have filled all tasks with details on date ' + attendanceDate);
      this.activeModal.close(true);
    });
  }

}
