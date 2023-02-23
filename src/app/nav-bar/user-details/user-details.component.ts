import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userDetails:any

  constructor(public dialogRef: MatDialogRef<UserDetailsComponent>,  public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }


}
