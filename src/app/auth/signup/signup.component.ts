import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SignUpRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup;
  signUpRequestPayload : SignUpRequestPayload;

  constructor(private authService : AuthService, private Router : Router, private Toastr : ToastrService) {
    this.signUpRequestPayload = {
      userName : '',
      password : '',
      email : ''
    }
   }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', Validators.required)
    });
  }

  signUp(){
    this.signUpRequestPayload.email = this.signUpForm.get('email').value;
    this.signUpRequestPayload.userName = this.signUpForm.get('userName').value;
    this.signUpRequestPayload.password = this.signUpForm.get('password').value;

    this.authService.signUp(this.signUpRequestPayload)
    .subscribe(() => {
        this.Router.navigate(["/login"], {queryParams : {registered : 'true'}});
    }, 
    () => {
        this.Toastr.error("Registration Failed! Please try again");
    });
  }

}
