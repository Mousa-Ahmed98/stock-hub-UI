import { Routes } from '@angular/router';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    
    {path: "signin", component: SignInComponent},
    {path: "signup", component: SignUpComponent},
    // { path: '**', component: NotFoundComponent},
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
];
