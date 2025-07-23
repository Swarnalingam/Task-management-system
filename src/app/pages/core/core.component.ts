import { Component, OnInit } from '@angular/core';
import { Base64Service } from '../../service/Base64.service';
import { Router, RouterOutlet } from '@angular/router';
import { SessionService } from '../../service/session.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-core',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss'
})
export class CoreComponent implements OnInit {

  logo:string="";
  isResetTask:boolean=false;

  constructor(private base64:Base64Service,private sessionService:SessionService,private router:Router){}

  ngOnInit(): void {
    this.logo=this.base64.userLogo;
    let activeUser=this.sessionService.getUser();
    let tasks=this.sessionService.getTask();
    this.isResetTask=activeUser.userType=='admin' && tasks.length;
    
  }

  onLogout(){
    this.sessionService.resetUser();
    this.router.navigate(['login'])
  }

  onResetTasks(){
    this.sessionService.resetTask();
    this.sessionService.subjectTaskChange.next(true);
  }

}
