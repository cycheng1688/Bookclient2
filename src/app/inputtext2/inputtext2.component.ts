import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MySessionService} from '../session-storage.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-confirmUser',
  template: `<h5> Confirmation of New User</h5>
    <input #confirmCode
      (keyup.enter)="confirmUser(confirmCode.value)"
      (blur)="confirmUser(confirmCode.value); confirmCode.value='' ">
    <button (click)="confirmUser(confirmCode.value)">Submit</button>
    
  
  `
})
export class Inputtext2Component {

clickMessage = '';
books:Object;
  constructor(private data: DataService,private session: MySessionService, private router: Router) { }

 confirmUser(confirmCode:string){
	 let newuser =this.session.getItem("uname");
	if(newuser!=''){
	this.data.login_getFav(`${newuser}`,`${confirmCode}`,4).subscribe(data=>{
  this.books=data
  window.alert(`New user: ${newuser} added!`)
  	console.log(this.books)
  

	})
	this.router.navigate(['/'])
	}
  }
}
