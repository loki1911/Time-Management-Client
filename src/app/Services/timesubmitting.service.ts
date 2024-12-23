import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSubmitingService {
  private baseUrl = 'https://localhost:7075/api/Task';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/Projects`);
  }

  getTasksByProjectId(projectId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/ProjectTask/${projectId}`);
  }

  submitFormData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/SaveTaskDetails`, data);
  }
  getTimeSheetData(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7075/api/Task/Gettaskdetails');
  }
}

export interface Project {
  id: string;
  name: string;
}
