import { Component } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar'
import {ButtonModule} from 'primeng/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
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
export class HomeComponent {
  sideBarVisibility :boolean = true;
  constructor(){
    
  }
}
