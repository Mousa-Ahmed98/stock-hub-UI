import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  registrationData = {
    username: '',
    password: '',
    email: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.registrationData).subscribe(
      () => {
        console.log('Registration successful');
        this.navigateToSignIn();
      },
      (error) => {
        console.error('Registration failed:', error);
        // Handle registration error
      }
    );
  }

  navigateToSignIn(){
    this,this.router.navigate(["/signin"]);
  }
}
