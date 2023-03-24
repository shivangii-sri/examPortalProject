import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) {}

  ngOnInit(): void {}

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  formSubmit() {
    console.log(this.user);
    if (this.user.userName == '' || this.user.userName == null) {
      //alert("User is required");

      //We use snack to display pop up message
      this.snack.open('Username is required !', '', { 
        duration : 3000, 
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }

    //Put validations here

    //addUser function from userSrevice
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        console.log('data');
        // alert('success');
        Swal.fire('Success!', 'User '+ data.username + ' is registered' , 'success');
      },
      (error) => {
        console.log(error);
        //alert('Something went wrong !');
        this.snack.open('Something went wrong !', '',  {
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'right'
        });
      }
    );
  }
}
