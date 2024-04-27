import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  loginData = {
    username: '',
    password: ''
  };
  constructor(private userService: UserService, private router: Router
    , private messageService: MessageService
  ) {}
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
        if(error['status'])
          {
            this.messageService.add({severity:'error', summary:'Login failed', detail:'Invalid username or password'});
            console.log("Invalid username or password");

          }
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
