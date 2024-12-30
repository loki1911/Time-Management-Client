import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://your-backend-api-url/projects'; 

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7075/api/Project/GetProjectData');
  }
  addProject(project: any): Observable<any> {
    return this.http.post<any>('https://localhost:7075/api/Project/SaveProject',project);
  }

  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${project.id}`, project);
  }
}
export interface Project {
  projectName: string;
  clientID: number;
  projectDescription: string;
  projectManager: string;
  employeeName: string;
  departmentID: number;
  departmentName: string;
  projectManagerID: number;
}

