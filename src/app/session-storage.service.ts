import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import {Input, EventEmitter, Output } from '@angular/core';

const STORAGE_KEY = 'any';

	@Injectable({
  providedIn: 'root'
})

export class MySessionService {

  constructor(@Inject(SESSION_STORAGE)private session: StorageService) { }

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();  
  		
			public sessiondata:any =[]
 
			setItem(key, val): void {
              console.log('recieved= key:' + key + 'value:' +     val);
				this.session.set(key, val);
				this.sessiondata[key]= this.session.get(key);
				if (key=="username")
				    this.fireIsLoggedIn.emit(this.session.get(key));
			}
 
			 getItem(key): string {
			    this.sessiondata[key]= this.session.get(key);
				console.log('recieved= key:' + key + ' value:' + this.session.get(key));
				return this.sessiondata[key]
			}
			
 
			clear(): void {
				this.session.clear();
				this.fireIsLoggedIn.emit('Sign In : Up');
				}
			  
		    getEmitter() {
				return this.fireIsLoggedIn;
			   }//emitter to update username in navbar
   
  
  
  
  
  
  
  }// SessionStorageService
