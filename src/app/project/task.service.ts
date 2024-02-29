import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL, API_GET_ALL_TASKS, API_UPDATE_TASK, API_EXPORT_TASKS, API_COPY_TASK } from '../shared/api.constants';
import { Task } from './task';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  
  constructor(private http: HttpClient) { }
  
  getAllTasks(projectId: string, date: any) : Observable<Task[]> {
    let httpParams: HttpParams;
    httpParams = new HttpParams().set('projectId', projectId).set('date', date);
    const options = {params: httpParams};
    return this.http.get<Task[]>(BASE_URL + API_GET_ALL_TASKS, options);
  }

  updateTask(taskId: number, taskDesc: string, status: string) : Observable<boolean> {
    console.log('taskId : ' + taskId);
    console.log('taskDesc : ' + taskDesc);
    console.log(BASE_URL + API_UPDATE_TASK + "/" + taskId);
    return this.http.put<boolean>(BASE_URL + API_UPDATE_TASK + "/" + taskId , {taskDesc: taskDesc, status: status});
  }

  copyPreviousTask(taskId: number, employeeId: string, projectId: string, date: any) : Observable<boolean> {
    console.log('taskId : ' + taskId);
    console.log('employeeId : ' + employeeId);
    console.log('projectId' + projectId);
    console.log('date' + date);

    let httpParams: HttpParams;
    httpParams = new HttpParams().set('employeeId', employeeId).set('projectId', projectId).set('date', date);
    console.log(httpParams);
    return this.http.put<boolean>(BASE_URL + API_COPY_TASK + "/" + taskId , httpParams);
  }

  export(attendanceDate: any, projectId: string) : Observable<any> {
    let httpParams: HttpParams;
    httpParams = new HttpParams().set('attendanceDate', attendanceDate).set('projectId', projectId);
    return this.http.get(BASE_URL + API_EXPORT_TASKS, {responseType:'arraybuffer', params: httpParams});
  }
}
