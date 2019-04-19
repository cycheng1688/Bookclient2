import { Component, OnInit } from '@angular/core';
import { MySessionService} from '../session-storage.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private session: MySessionService,private router: Router) { }

  ngOnInit() {
  
if(this.session&&this.session.getItem("username")!=undefined)
     {	
	 // console.log(this.session.getItem("success"))
	 // console.log(this.session.getItem("username"))
	 // console.log('logging out')
	  this.session.clear()
      
	  this.router.navigate(['/login'])
	 }
else 
{window.alert('You have not sign in ! Pls. sign in to visit us !')
this.router.navigate(['/login'])
}
  }
}




