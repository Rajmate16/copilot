import { environment } from 'src/environments/environment';

export const BASE_URL = environment.apiUrl;

// AUTHENTICATION APIs
export const API_GET_ALL_PROJECTS = '/api/projects/getall';
export const API_ADD_PROJECT = '/api/projects/add';
export const API_DELETE_PROJECT = '/api/projects/delete';
export const API_GET_ALL_TASKS = '/api//tasks/getall';
export const API_UPDATE_TASK = '/api/tasks/update';
export const API_COPY_TASK = '/api/tasks/copy';
export const API_EXPORT_TASKS = '/api/tasks/export';

export const API_ADD_EMPLOYEE = '/api/employees/add';
export const API_UPDATE_EMPLOYEE = '/api/employees/update';
export const API_DELETE_EMPLOYEE = '/api/employees/delete';
export const API_GET_EMPLOYEE = '/api/employees/get';