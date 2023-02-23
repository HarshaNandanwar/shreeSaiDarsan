import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showLogoutBtn = false;

  constructor(private router: Router, private localStorage: LocalStorageService) {
    var s = localStorage.isLoggedIn();
  }

  ngOnInit() {
    // if (this.localStorage.isLoggedIn()) {
    //   this.showLogoutBtn = !this.showLogoutBtn;
    // }
  }
}
