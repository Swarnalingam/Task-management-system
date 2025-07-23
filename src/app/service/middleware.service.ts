import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService implements CanActivate {

   constructor(
    private router: Router,
    private sessionService: SessionService,
  ) { }
  canActivate(): boolean {
    let activeUser=this.sessionService.getUser();
    if(activeUser){
      // let routePath=location.pathname;
      // if(['/',''].includes(routePath))this.router.navigateByUrl('dashboard');
     return true
    } else{
      this.router.navigateByUrl('login');
     return false
    }
    }
}
