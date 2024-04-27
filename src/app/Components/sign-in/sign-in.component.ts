import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  loginData = {
    username: '',
    password: ''
  };
  constructor(private userService: UserService, private router: Router) {}
  login() {
    this.userService.login(this.loginData).subscribe(
      (val) => {
        console.log('Login successful');
        console.log(val.token); 
        console.log("set token local storage");
        localStorage.setItem("token", val.token);
        this.navigateToHome();
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle login error
      },
    );
  }

  navigateToSignUp(){
    this,this.router.navigate(["/signup"]);
  }

  private navigateToHome(){
    this,this.router.navigate([""]);
  }
}
