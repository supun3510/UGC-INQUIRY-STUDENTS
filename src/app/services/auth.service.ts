import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environment';

interface AuthResponse {
  token: string;
  user: any; // Replace 'any' with your user interface
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already authenticated
    this.checkAuthStatus();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.baseURL}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          // The token will be automatically stored as an httpOnly cookie by the backend
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.baseURL}/auth/register`, userData)
      .pipe(
        tap(response => {
          // The token will be automatically stored as an httpOnly cookie by the backend
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.baseURL}/auth/logout`, {})
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
        })
      );
  }

  private checkAuthStatus() {
    this.http.get<{user: any}>(`${environment.baseURL}/auth/me`)
      .subscribe({
        next: (response) => {
          this.currentUserSubject.next(response.user);
        },
        error: () => {
          this.currentUserSubject.next(null);
        }
      });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
} 