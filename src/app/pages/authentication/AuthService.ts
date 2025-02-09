import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.baseURL + '/auth'; // Replace with your backend API

  constructor(private http: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl +'/sign-in', userData);
  }

  register(userData: any): Observable<any> {
    console.log("registration : " ,userData)
    return this.http.post<any>(this.apiUrl + '/sign-up', userData);
  }
}
