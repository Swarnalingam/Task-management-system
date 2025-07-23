import { Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const coreRoute: Routes = [
    {
     path:'',
     component:CoreComponent,
     children:[
        {
          path:'dashboard',
          component:DashboardComponent
        }
     ]
    }
];
