import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskService } from './task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Task } from './task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportTasksComponent } from './export-tasks/export-tasks.component';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faDownload, faSpinner, faSync, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterContentInit {

  spinnerIcon = faSpinner;
  backIcon = faArrowAltCircleLeft;
  searchIcon = faSearch;
  syncIcon = faSync;
  plusIcon = faPlus;
  downloadIcon = faDownload;
  dayOfWeek: number = new Date().getDay();

  tasks: Task[] = [];
  projectId: string = '';
  myGroup = new FormGroup({
    dateControl: new FormControl(new DatePipe('en-US').transform(Date.now(), 'yyyy-MM-dd')),
  });
  dateControl: FormControl = new FormControl();

  loading = false;
  constructor(private taskService: TaskService, 
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private datePipe: DatePipe) {
   }

  ngOnInit(): void {
    // this.maxDate = new DatePipe('en-US').transform(Date.now(), 'yyyy-MM-dd');
  }

  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      if (params['projectId'] === undefined) {
        this.router.navigate(['']);
      } else {
        this.projectId = params['projectId'];
        this.refresh();
      }
    });
  }

  refresh() {
    const date = this.myGroup.controls['dateControl'].value;
    this.getAllTasks(this.projectId, date);
  }
  
  getAllTasks(projectId: string, date: any) {
    console.log('In getAllTasks');
    console.log(date);
    
    this.dayOfWeek = new Date(Date.parse(date)).getDay();
    console.log(this.dayOfWeek);
    if(this.dayOfWeek == 0 || this.dayOfWeek == 6) {
      console.log('this is sunday or saturday, so returning');
      this.tasks = [];
      return;
    }
    console.log(projectId);
    console.log(date);
    const strDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    this.loading = true;
    this.taskService.getAllTasks(projectId, strDate).subscribe((data: Task[]) => {
      this.tasks = data;
      console.log(data);
      this.loading = false;
    });
    // this.loading = false;
  }

  dateChanged() {
    const date = this.myGroup.controls['dateControl'].value;
    this.getAllTasks(this.projectId, date);
  }

  btnGoBackClicked() {
    this.router.navigate(['']);
  }

  openExportTasksModal() {
    const modalRef = this.modalService.open(ExportTasksComponent, {
      size: 'md', centered: true
    });
    modalRef.componentInstance.projectId = this.projectId;
    // modalRef.componentInstance.taskDesc = taskDesc;
    modalRef.result.then((result) => {
      console.log('result of update task component : ' + result);
      if (result !== false) {
        // this.userListComponent.getUsers();
        // this.updated.emit(true);
      }
    }).catch((err) => {
      console.log('update-task modal dismissed');
    });
  }

  openAddEmployeeModal() {
    const modalRef = this.modalService.open(AddEmployeeComponent, {
      size: 'md', centered: true
    });
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.mode = 'add';
    // modalRef.componentInstance.taskDesc = taskDesc;
    modalRef.result.then((result) => {
      console.log('result of add employee component : ' + result);
      if (result === true) {
        this.refresh();
      }
    }).catch((err) => {
      console.log('add employee modal dismissed');
    });
  }

}
