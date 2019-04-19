import { Component, OnInit } from '@angular/core';
import { MySessionService} from '../session-storage.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})


export class NavComponent implements OnInit {
appTitle = 'Bookshop';
loginPage ='Sign In : Up'
logoutPage=''
  constructor(private session: MySessionService) { }

  ngOnInit() {
	var  islogName = ''
    this.session.getEmitter().subscribe((islogName) => {
       this.loginPage=islogName;
	   this.logoutPage ='Sign out'
	   if(this.loginPage=='Sign In : Up')
		   this.logoutPage =''
	 });
 }

}

	