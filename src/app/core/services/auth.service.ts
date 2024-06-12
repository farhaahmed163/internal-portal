import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://geekyair-internal-system-1.onrender.com';

  constructor(private HttpClient: HttpClient) {}

  login(): Observable<any> {
    const body = {};
    return this.HttpClient.post(`${this.apiUrl}/graphql/get-auth`, body);
  }
}
