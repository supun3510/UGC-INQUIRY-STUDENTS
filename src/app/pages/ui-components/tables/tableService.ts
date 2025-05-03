import { Injectable, model } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = environment.baseURL + '/users/all-inquires'; // Replace with actual API URL
  private apiUrlMeToOthers = environment.baseURL + '/users/me-to-others';
  private apiUrlOthersToMe = environment.baseURL + '/users/others-to-me';

  constructor(private http: HttpClient) {}

  getInqueries(): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(this.apiUrl)
    return this.http.post<any[]>(this.apiUrl, "" ,{headers});
  }

  getInqueriesMeToOthers(): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(this.apiUrlMeToOthers)
    return this.http.post<any[]>(this.apiUrlMeToOthers, "" ,{headers});
  }

  getInqueriesOthersToMe(): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(this.apiUrlOthersToMe)
    return this.http.post<any[]>(this.apiUrlOthersToMe, "" ,{headers});
  }
  getUsersToForword(): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(this.apiUrl)
    return this.http.post<any[]>(environment.baseURL + '/users/admin-list',"", {headers});
  }

  // addUser(user: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/users`, user);
  // }

  // updateUser(user: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, user);
  // }

  // deleteUser(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  // }
  
  addInquiry(model: any): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(environment.baseURL + "/users/add-inquiry", model ,{headers});
  }

  editInquiryFile(model: any): Observable<any> {
    alert("caling 2")
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(environment.baseURL + "/users/edit-inquiry-file", model ,{headers});
  }

  editInquiry(id: any, model: any): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(environment.baseURL + `/users/update/inquiry`, model, {headers});
}

deleteInquiry(id: any): Observable<any> {
  var token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete<any>(environment.baseURL + `/users/inquiry/${id}`, {headers});
}

deleteInquiryFile(model: any): Observable<any> {
  var token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post<any>(environment.baseURL + `/users/delete-inquiry-file` , model , {headers});
}

updateStatus(model: any): Observable<any> {
  var token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post<any>(environment.baseURL + `/users/change-inquiry-status`, model , {headers});
}

}
