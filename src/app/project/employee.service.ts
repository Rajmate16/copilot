import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, API_UPDATE_EMPLOYEE, API_ADD_EMPLOYEE, API_GET_EMPLOYEE, API_DELETE_EMPLOYEE } from '../shared/api.constants';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  
  getEmployee(projectId: string, employeeId: string) : Observable<Employee> {
    return this.http.get<any>(BASE_URL + API_GET_EMPLOYEE + "/" + projectId + "/" + employeeId);
  }

  addEmployee(employee: Employee) : Observable<boolean> {
    console.log(JSON.stringify(employee));
    return this.http.post<boolean>(BASE_URL + API_ADD_EMPLOYEE, employee);
  }

  updateEmployee(employee: Employee) : Observable<boolean> {
    console.log(JSON.stringify(employee));
    return this.http.put<boolean>(BASE_URL + API_UPDATE_EMPLOYEE, employee);
  }

  deleteEmployee(projectId: string, employeeId: string) : Observable<boolean> {
    return this.http.delete<any>(BASE_URL + API_DELETE_EMPLOYEE + "/" + projectId + "/" + employeeId);
  }

}
