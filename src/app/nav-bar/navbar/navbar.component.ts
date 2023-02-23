import { Component, Input, OnInit } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() public logout: any;

  constructor(private dialog: MatDialog, private localStorage: LocalStorageService) {

  }
  ngOnInit(): void {
   
  }
  logOut() {

  }

  openuserModel() {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '300px',
      height: '400px',
    });
  }
}
