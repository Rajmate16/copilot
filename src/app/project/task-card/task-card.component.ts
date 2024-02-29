import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, OnChanges } from '@angular/core';
import { Task } from '../task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { faCopy, faEdit } from '@fortawesome/free-regular-svg-icons';
import { TaskService } from '../task.service';
import { DatePipe } from '@angular/common';
import { Multiline } from 'src/app/shared/multiline';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  faCopy = faCopy;
  faEdit = faEdit;
  projectId: string ='';
  @Input() date: any;
  showEditCopyBtn: boolean = true;

  @Input()
  task: Task = new Task;

  @Output() updated = new EventEmitter<boolean>();
  
  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
    private multiline: Multiline,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  copyPreviousTask() {
    const strDate = this.datePipe.transform(this.task.date, 'dd/MM/yyyy');
    this.taskService.copyPreviousTask(
      this.task.taskId, 
      this.task.employeeId, 
      this.task.projectId, 
      strDate
      ).subscribe((data : boolean) => {
        console.log(data);
        this.updated.emit(true);
      });
  }

  openUpdateTaskModal(taskId: number, taskDesc: string, status: string) {
    const modalRef = this.modalService.open(UpdateTaskComponent, {
      size: 'md', centered: true
    });
    modalRef.componentInstance.taskId = taskId;
    modalRef.componentInstance.taskDesc = taskDesc;
    modalRef.componentInstance.status = status;
    console.log(status);
    modalRef.result.then((result) => {
      console.log('result of update task component : ' + result);
      if (result === true) {
        // this.userListComponent.getUsers();
        this.updated.emit(true);
      }
    }).catch((err) => {
      console.log('update-task modal dismissed');
    });
  }

  openUpdateEmployeeModal() {
    const modalRef = this.modalService.open(AddEmployeeComponent, {
      size: 'md', centered: true
    });
    modalRef.componentInstance.projectId = this.task.projectId;
    modalRef.componentInstance.employeeId = this.task.employeeId;
    modalRef.componentInstance.mode = 'update';
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

  refresh() {
    this.updated.emit(true);
  }



}
