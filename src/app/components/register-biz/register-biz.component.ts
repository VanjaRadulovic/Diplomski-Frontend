import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-biz',
  templateUrl: './register-biz.component.html',
  styleUrls: ['./register-biz.component.css']
})
export class RegisterBizComponent {

  registerForm: FormGroup;
  isLoading: boolean = false;
  isFormValid = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserService, private authService: AuthService,
    private toastr: ToastrService) 
 
    {
   this.registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
     email: ['', [Validators.required, Validators.email]],
     password: ['', Validators.required],
     remember: false
   });

   this.registerForm.valueChanges.subscribe(() => {
     this.isFormValid = this.registerForm.valid;
   });
 }

 register() {
  this.authService.registerbiz(this.registerForm.get('firstName')?.value,this.registerForm.get('lastName')?.value,
  this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe({
    next: response => {
        sessionStorage.setItem("token", <string>response.body?.token);
        this.userService.setToken(<string>response.body?.token);
        this.router.navigate(['']);
        console.log("Logged in");
      
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

