import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private _login: AuthServiceService,private localStorage:LocalStorageService) {

  }
  onLogin(data: any) {
    console.log(data);

    this._login.loginPost(data).subscribe(data => {
      console.log(data);
      this.localStorage.saveUserData(data);
      this.router.navigate(['/admin'])
    })


  }

}
