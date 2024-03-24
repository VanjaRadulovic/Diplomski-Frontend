import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-biz',
  templateUrl: './login-biz.component.html',
  styleUrls: ['./login-biz.component.css']
})
export class LoginBizComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;
  isFormValid = false;
  userNotActive: boolean = false

  constructor(private formBuilder: FormBuilder, private router: Router,
     private userService: UserService, private authService: AuthService,
     private toastr: ToastrService) 
  
     {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: false
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isFormValid = this.loginForm.valid;
    });
  }

  closeUserNotActive() {
    this.userNotActive = false
  }

  ngOnInit(): void {
    if(localStorage.getItem("remember")!==null){
      this.router.navigate(['']);
    }
    if(sessionStorage.getItem("remember")!==null){
      this.router.navigate(['']);
    }
  }

  login() {
    this.authService.loginbiz(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe({
      next: response => {
        console.log(this.loginForm.get('remember')?.value);
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem("token", <string>response.body?.token);
          localStorage.setItem("remember", "local");
          localStorage.getItem("remember");
          this.router.navigate(['']);
        } else {
          sessionStorage.setItem("token", <string>response.body?.token);
          this.userService.setToken(<string>response.body?.token);
          this.router.navigate(['']);
          console.log("Logged in");
        }
      },
      error: err => {
        console.error(err); // Log the error to the console
        if (err.status === 403) {
          // Display the error message from the response
          this.toastr.error("Invalid credentials");
        } else {
          // Handle other errors or show a generic error message
          this.toastr.error("An error occurred. Please try again.");
        }
      }
    });
  }
  

}