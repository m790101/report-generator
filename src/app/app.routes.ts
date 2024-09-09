import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { EntranceComponent } from './entrance/entrance.component';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [
  {
    path:'',
    component: EntranceComponent
  },
  {
    path:'report',
    component: HomeComponent
  },
  {
    path:'booking',
    component: BookingComponent
  }
];
