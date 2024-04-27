import { Component, OnInit } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar'
import {ButtonModule} from 'primeng/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  sideBarVisibility :boolean = true;
  constructor(private router: Router){
    
  }
  ngOnInit(): void {
    if(this.isTokenValid(localStorage.getItem("token")?? "") ==false){
      this.navigateToSignIn()
    }
  }

  private isTokenValid(token: string): boolean {
    try {
        const decodedToken: any = jwtDecode(token);
        const expirationTime: number = decodedToken.exp * 1000; // Convert expiration time to milliseconds
        const currentTime: number = new Date().getTime();

        return currentTime < expirationTime;
    } catch (error) {
        // Token is invalid or cannot be decoded
        return false;
    }
}
private navigateToSignIn(){
  this.router.navigate(["/signin"]);
}
}
