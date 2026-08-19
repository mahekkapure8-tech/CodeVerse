import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl =
    'https://crestless-overfull-scrunch.ngrok-free.dev/api/dashboard';

  private headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(
      this.apiUrl,
      { headers: this.headers }
    );
  }
}