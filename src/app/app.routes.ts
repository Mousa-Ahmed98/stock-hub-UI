import { Routes } from '@angular/router';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { OrderComponent } from './Components/order/order.component';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { StockHistoryComponent } from './Components/stock-history/stock-history.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: "home", component: HomeComponent,  children: [
        { path: '', component: StatisticsComponent },
        { path: 'order', component: OrderComponent },
        { path: 'stock/:symbol', component: StockHistoryComponent }
      ]},
    {path: "signin", component: SignInComponent},
    {path: "signup", component: SignUpComponent},
    { path: '**', component: NotFoundComponent},
];
