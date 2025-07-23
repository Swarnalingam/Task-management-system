import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userDetail:any={
    userId:'',
    password:''
  };
  constructor(private router:Router, private sessionService:SessionService){

  }

  onGoHome(){
    let findUser = this.sessionService.credentials.find((user:any)=>user.userId.toLowerCase()==this.userDetail.userId.toLowerCase() && user.password.toLowerCase()==this.userDetail.password.toLowerCase()) || null;
    if(findUser!=null){
      alert(`Logged in User as ${findUser.userType}`);
      this.sessionService.setUser(findUser);
     this.router.navigateByUrl('/dashboard');
    } else{
      alert('Please check Email or Password')
    }
    
   
  }

}
