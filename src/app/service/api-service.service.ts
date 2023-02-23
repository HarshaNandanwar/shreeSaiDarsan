import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getMallDetail() {
    return this.http.get(`${this.baseUrl}/details`)
  }


}
