import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSubmitingService {
  private baseUrl = 'https://localhost:7075/api/Task';
  private baseUrl2 = 'https://localhost:7075/api/Client';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/Projects`);
  }
  GetBillTypesByProjectId(projectId: string) : Observable<BillType[]>{
    return this.http.get<BillType[]>(`${this.baseUrl2}/BillingType/${projectId}`)
  }

  getTasksByProjectId(projectId: string): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/ProjectTask/${projectId}`);
  }
  submitFormData(formData: any): Observable<any> {
    const dataToSend = {
      ProjectId: formData.projectName, 
      TaskName: formData.taskName,
      BillingType: formData.billingType,
      Date: formData.workDate,
      TimeWorked: formData.timeWorked,
      Description: formData.description,
      ClientId: formData.clientId, 
    };

    console.log('Submitting data:', dataToSend);

    return this.http.post(`${this.baseUrl}/SaveTaskDetails`, dataToSend);
  }
  getTimeSheetData(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7075/api/Task/Gettaskdetails');
  }
  getClientByProjectId(projectId: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/ClientByProjectId/${projectId}`);
  }

  getManagerData() : Observable<any[]>{
    return this.http.get<any []>('https://localhost:7075/api/Client/get-managerdata');
  }
  getDepartmentData() : Observable<any[]>{
    return this.http.get<any []>('https://localhost:7075/api/Client/get-deptdata');
  }

  getClientData():Observable<Client[]> {
    return this.http.get<Client[]>('https://localhost:7075/api/Client/get-data')
  }
  addClient(clientName: string): Observable<any> {
    const payload = { clientName }; 
    return this.http.post<any>('https://localhost:7075/api/Client/insert-data',payload);

  }

  updateClient(clientId: string, clientName: string): Observable<any> {
    const payload = { clientId, clientName };
    return this.http.put<any>('https://localhost:7075/api/Client/Edit-data',payload);

  }
 
}
export interface Client {
  clientId: number;
  clientName: string;
}

export interface Project {
  ProjectId: number;
  ProjectName: string;
}
export interface Task {
  TaskId : number
  TaskName: string;
}
export interface BillType{
  BillType : string
}
