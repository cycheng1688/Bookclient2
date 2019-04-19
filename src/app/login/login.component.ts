import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { DataService } from '../data.service'; 
import { MySessionService} from '../session-storage.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
   
  
  })

export class LoginComponent implements OnInit {

  message:object;
  messageForm: FormGroup;   submitted = false;   success = false; Newuseradded = false;messageForm2: FormGroup; registered =false;
 
  constructor(private formBuilder: FormBuilder, private data: DataService, private session: MySessionService,private router: Router) { } 
    
	
	ngOnInit() { this.messageForm = this.formBuilder.group({ 
                 name: ['', Validators.required],       
	             password: ['', [Validators.required,Validators.minLength(6)]]
			     });
			    this.messageForm2 = this.formBuilder.group({
			   fname: ['', Validators.required],
		       lname: ['', Validators.required],
		       uname: ['', Validators.required],
			   upass: ['', [Validators.required,Validators.minLength(6)]],
			   uemail: ['', [Validators.required,Validators.email]]
			   });
	}
 
   onRegister() { 
 
        this.registered = true; 
		
		// window.alert( 'Sorry, this function not implemented yet')
              
           if (this.messageForm2.invalid) { return window.alert("Invalid input!!Pls. enter again !");} 
	
	
       this.data.login_getFav(this.messageForm2.controls.uname.value,this.messageForm2.controls.upass.value, 3)
	   .subscribe(data=>{
           this.message = data ;			
     //  console.log(this.message)
       this.success = true;
	   this.Newuseradded = true;
	   this.session.setItem("success", `${this.success}`);
	   this.session.setItem("uname", `${this.messageForm2.controls.uname.value}`);
	   this.session.setItem("upass", `${this.messageForm2.controls.upass.value}`);
	  window.alert( 'New user added. Pls. send confirmation code to complete registration')
	 // console.log(this.session.getItem("success"))
	  //console.log(this.session.getItem("uname"))
	  //console.log(this.session.getItem("upass"))
	  //console.log('all set')
	  this.router.navigate(['/login'])
	   
	})
	
	    //to be implemented
  }
  onSubmit() { 
 
        this.submitted = true; 
          
    if (this.messageForm.invalid) { return  window.alert("Invalid input !! Pls. enter again !!");} 
       this.data.login_getFav(this.messageForm.controls.name.value,this.messageForm.controls.password.value, 1)
	   .subscribe(data=>{
           this.message = data;			
       console.log(this.message)
       this.success = true;
	   this.session.setItem("success", `${this.success}`);
	   this.session.setItem("username", `${this.messageForm.controls.name.value}`);
	   this.session.setItem("password", `${this.messageForm.controls.password.value}`);
	  window.alert( 'You can now navigate your Favourites')
	//  console.log(this.session.getItem("success"))
	//  console.log(this.session.getItem("username"))
	 // console.log(this.session.getItem("password"))  
	   this.router.navigate(['/'])
	 
	   
	})
  }  
  
  
}
