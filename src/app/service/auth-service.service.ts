import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {

  }

  loginPost(data: any) {
    let logindetail = new FormData();
    logindetail.append('username', data.email);
    logindetail.append('password', data.password);
    return this.http.post(`${environment.baseUrl}/user-login-v2`, logindetail);
  }
}
