import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/user/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/user/login`, data);
  }
}
