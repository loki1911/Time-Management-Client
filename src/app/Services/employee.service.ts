import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:7075/api/employees'; 
  private apiUrl2 = 'https://localhost:7075/api/Userdetails/tasks';
  private apiUrl3 = 'https://localhost:7075/api/TaskDetails/GetWorkDetailsByEmail';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7075/api/Employees');
  }
  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>('https://localhost:7075/api/Employees/SaveEmployee', employee);
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http.put<any>('https://localhost:7075/api/Employees/update', employee);
  }
  getRoleData() : Observable<Role[]>{
    return this.http.get<Role []>('https://localhost:7075/api/Client/get-roledata');
  }
  getDepartmentData() : Observable<Department[]>{
    return this.http.get<Department []>('https://localhost:7075/api/Client/get-deptdata');
  }
  getTasksByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${email}`);
  }

  getWorkDetails(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl3}?email=${encodeURIComponent(email)}`);
  }

}
export interface Department {
  DepartmentId: number;
  DepartmentName: string;
}

export interface Role {
  RoleId: number;
  RoleName: string;
}

