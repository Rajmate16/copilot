import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project';
import { HttpParams, HttpClient } from '@angular/common/http';
import { API_GET_ALL_PROJECTS, BASE_URL, API_ADD_PROJECT, API_DELETE_PROJECT } from '../shared/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllProjects() : Observable<Project[]> {
    return this.http.get<Project[]>(BASE_URL + API_GET_ALL_PROJECTS);
  }

  addProject(project: Project) : Observable<Boolean> {
    return this.http.post<Boolean>(BASE_URL + API_ADD_PROJECT, project);
  }

  deleteProject(projectId: string) : Observable<any> {
    let httpParams: HttpParams;
    httpParams = new HttpParams().set('projectId', projectId);
    return this.http.delete(BASE_URL + API_DELETE_PROJECT + '/' + projectId);
  }
}


