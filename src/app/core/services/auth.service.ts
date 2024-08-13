import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://geekyair-internal-system-1.onrender.com';
  busId = localStorage.getItem('BusniessId');
  constructor(private HttpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.HttpClient.post(`${this.apiUrl}/businesses/login`, body);
  }
  signUp(signup: any): Observable<any> {
    const body = signup;
    return this.HttpClient.post(`${this.apiUrl}/businesses/signup`, body);
  }
  getAuthRequest(): Observable<any> {
    return this.HttpClient.get(
      `${this.apiUrl}/graphql/get-auth-request-dynamically/${this.busId}`
    );
  }
}
