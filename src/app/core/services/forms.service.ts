import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  private apiUrl: string = 'https://geekyair-internal-system-1.onrender.com';
  busId = localStorage.getItem('BusniessId');
  constructor(private HttpClient: HttpClient) {}

  subCategory(categoryNames: any[]): Observable<any> {
    const body = { categoryNames };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.HttpClient.post(
      `${this.apiUrl}/getFilteredSubcategories`,
      body,
      { headers }
    );
  }

  submitDynamicQuery(data: any): Observable<any> {
    const body = data;
    return this.HttpClient.post(
      `${this.apiUrl}/buildDynamicJobSearchQuery/${this.busId}`,
      body
    );
  }
  submitDynamicAi(data: any): Observable<any> {
    const body = data;
    return this.HttpClient.post(
      `${this.apiUrl}/dynamicAiPrompt/${this.busId}`,
      body
    );
  }
  updateBusinessUpwork(data: any): Observable<any> {
    const body = data;
    return this.HttpClient.put(
      `${this.apiUrl}/businesses/${this.busId}/upwork-creds`,
      body
    );
  }
}
