import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.baseURL; // Replace with your backend API

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl +'/users/inquiry/summary',"", {headers});
  }
 
}
