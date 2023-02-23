import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  userData: any = {};

  constructor(private router: Router) { }

  isLoggedIn() {
    if (localStorage.getItem('jwtToken') != null) {
      return true;
    }
    return false;
  }

  logout() {
    this.userData = {};
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  saveUserData(value: any) {
    if (value) {
      let token = JSON.stringify(value.data.api_token);
      localStorage.setItem("jwtToken", token);
    }
  }

  getToken() {
    let jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken != null) {
      return JSON.parse(jwtToken);
    }
  }

}
