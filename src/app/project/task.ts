import { DatePipe } from '@angular/common';

export class Task {

    taskId: number = 0;
    projectId: string = '';
    employeeId: string = '';
    taskDesc: string = '';
    date: string = '';
    status: string = '';
    employeeName = '';

    constructor() {
    }

}
