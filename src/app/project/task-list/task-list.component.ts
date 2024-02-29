import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task[] = [];
  @Input() date: any;
  @Output() refresh = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  refreshTaskList() {
    this.refresh.emit(true);
  }

}
