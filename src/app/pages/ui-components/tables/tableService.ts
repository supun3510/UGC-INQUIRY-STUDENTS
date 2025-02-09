import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = environment.baseURL + '/users/all-inquires'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    console.log(this.apiUrl)
    return this.http.post<any[]>(this.apiUrl, "");
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  }
  
  addInquiry(model: any): Observable<any> {
    return this.http.post<any>(environment.baseURL + "/users/add-inquiry", model);
  }

  editInquiry(id: any, model: any): Observable<any> {
    return this.http.post<any>(environment.baseURL + `/users/add-inquiry`, model);
}

deleteInquiry(id: any): Observable<any> {
  return this.http.delete<any>(environment.baseURL + `/users/inquiry/${id}`);
}

}
