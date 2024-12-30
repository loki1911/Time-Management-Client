import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7075/api/auth/login'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ EmployeeEmailId: email, Password: password });
  
    return this.http.post(this.apiUrl, body, { headers }).pipe(
      map((response: any) => {
        console.log(response);
  
        if (response.token && response.token.jwtToken && response.token.roleName) {
          localStorage.setItem('token', response.token.jwtToken);
          localStorage.setItem('role', response.token.roleName);
        } else {
          console.error('Failed to retrieve token and role from response');
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login failed', error);
        throw error;
      })
    );
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

}