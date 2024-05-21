import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UpworkService {
  private apiUrl: string = 'https://geekyair-internal-system.onrender.com';

  constructor(private HttpClient: HttpClient) {}

  getFilterdJobs(): Observable<any> {
    return this.HttpClient.get(`${this.apiUrl}/graphql/listFilteredJobs`);
  }
  getProposal(offer: string): Observable<any> {
    const body = { offer };
    return this.HttpClient.post(`${this.apiUrl}/gemini/run-prediction`, body);
  }
}
