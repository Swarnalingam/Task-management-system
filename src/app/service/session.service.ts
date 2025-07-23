import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  subjectTaskChange = new Subject();
  credentials:any=[{
    userId:'admin@gmail.com',
    password:'12345',
    userType:'admin'
  },
  {
    userId:'manager@gmail.com',
    password:'2025',
    userType:'manager'
  },
  {
    userId:'member@gmail.com',
    password:'ABC',
    userType:'other'
  }
]

  constructor() { }

  getUser(){
    let user = sessionStorage.getItem('user');
    return !!user ? JSON.parse(user) :null;
  }

  setUser(user:any){
    sessionStorage.setItem('user',JSON.stringify(user))
  }
  
  resetAll(){
   sessionStorage.clear()
  }

  resetUser(){
    sessionStorage.removeItem('user')
  }

  getTask(){
    let tasks = sessionStorage.getItem('task');
    return !!tasks && tasks.length ? JSON.parse(tasks) :[];
  }

  setTask(tasks:any){
    sessionStorage.setItem('task',JSON.stringify(tasks))
  }

  resetTask(){
    sessionStorage.removeItem('task')
  }

  
}
