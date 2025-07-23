import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MiddlewareService } from './service/middleware.service';

export const routes: Routes = [
    {
        path:'login',component:LoginComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path:'', canActivate:[MiddlewareService], loadChildren:()=>import('../app/pages/core/core-routing.module').then(module=>module.coreRoute)
    },
    {
        path: '**', redirectTo: '/dashboard'
    }
];
