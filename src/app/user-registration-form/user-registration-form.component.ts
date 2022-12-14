import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  // styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {
    Username: "",
    Password: "",
    Email: "",
    Birthday: ""
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
    * Calls API method to register user with data from form
    */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result)
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    });
  }

}
