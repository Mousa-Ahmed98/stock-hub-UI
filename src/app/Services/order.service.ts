import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models/iorder';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5001';

  constructor(private http: HttpClient, private userService: UserService) {}

  add(data: IOrder): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    console.log(localStorage.getItem("token"));
    return this.http.post(`${this.apiUrl}/api/order/add`, data, {headers});
  }



  getOrders(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    console.log(localStorage.getItem("token"));
    return this.http.get(`${this.apiUrl}/api/order/orders`, {headers});
  }
}
