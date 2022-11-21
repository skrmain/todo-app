import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  get() {
    return this.http.get(this.baseUrl);
  }
}
