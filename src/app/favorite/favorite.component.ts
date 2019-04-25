import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MySessionService} from '../session-storage.service';

@Component({
  selector: 'app-myfav',
  template: `
 
<ul *ngIf="books"><p></p>
<li *ngFor="let book of books.favourites; index as i">

<h3>Title: {{ book.favlist[0].title }} {{getAvg(i, books.favourites)}} <button (click)="delFavHandler(i,books.favourites)">  Delete</button></h3>
<h4>Authors: {{book.favlist[0].authors[0] }}</h4>
<p><strong>Description:</strong> {{ book.favlist[0].description}} </p>
<p ><textarea #comment 
(keyup.enter)="editFavHandler(i,books.favourites,comment.value)"
rows="4" cols="60"> {{book.favlist[0].review}}</textarea> <button align ="middle"  (click)="editFavHandler(i,books.favourites,comment.value)">Add or Edit Review</button></p>
<p><strong>Your rating:  </strong>[ {{  book.favlist[0].star}} ] <strong>  Rate this book  </strong><select (change)="valueChanged(i,books.favourites,$event.target.value)">
  <option value=1>1</option>
  <option value=2>2</option>
  <option value=3>3</option>
  <option value=4>4</option>
  <option value=5>5</option>
</select> </p><p *ngIf=msg[i]><strong> Avg rating from all readers:</strong>  {{msg[i] }} </p><hr>
</li>
</ul>
  
  `
})

    

	 
	
export class FavoriteComponent implements OnInit {
books:Object; msg=[]; count =0; 

clickMessage = '';
  constructor(private data: DataService,  private session: MySessionService) { }
 
   
   ngOnInit() {
   
     if(this.session&&this.session.getItem("username")!=undefined)
     {	
	  console.log(this.session.getItem("success"))
	  console.log(this.session.getItem("username"))
	  console.log(this.session.getItem("password"))
	  
	 let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	  
	 
	  this.data.login_getFav(`${a}`,`${b}`,2).subscribe(data=>{
	  
	  this.books = data;
//	  console.log(this.books);
	 })
     } 
	 else // endif
	 {
		this.clickMessage = `Sorry! Need to login first! `;
		window.alert( this.clickMessage)
	}
	
   } //end  ngOnInit
  
	delFavHandler(i:number,book:Object,choice:number)
	{if(this.session.getItem("username")!=undefined)
	{ 
     let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	 let id =i
	 let bookfav=book
	
	 this.data.addFav(`${a}`,`${b}`, id, bookfav,3).subscribe(data=>{
     //this.books = JSON.stringify(data);	//error mapping as object return not array
      
     this.clickMessage =` Book with title: ${book[i].favlist[0].title} is deleted!`
	 window.alert( this.clickMessage)
	 this.ngOnInit()
	})}
    else {
     this.clickMessage = `Need to login first!  Book with title: ${book[i].favlist[0].title} is pressed!`;
     window.alert( this.clickMessage)
	 this.ngOnInit()
	}
   }
	editFavHandler(i:number,book:Object,receivedTxt:String)
	{if(this.session.getItem("username")!=undefined)
	{let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	 let id =i
	 let bookfav=book
	  
	  bookfav[id].favlist[0].review = receivedTxt
	// console.log('received txt '+receivedTxt)
	
	 this.data.addFav(`${a}`,`${b}`, id, bookfav,2).subscribe(data=>{
		this.clickMessage = 'Comments received! Thank you';
		window.alert( this.clickMessage)
		this.ngOnInit()
	})}
  else {
         this.clickMessage = `Need to login first!  Book with title: ${book[i].favlist[0].title} is pressed!`;
         window.alert( this.clickMessage)
	    this.ngOnInit()
	}
   }
   
   getAvg(i:number,book:Object)
   {if(this.session.getItem("username")!=undefined&& this.count<=Object.keys(book).length-1)
	{let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	this.count=this.count+1
	console.log('count '+ this.count)
    this.data.addFav(`${a}`,`${b}`, i, book,5).subscribe(data=>{
		if(data!=undefined) {this.msg[i]=JSON.stringify(data)
		console.log('message '+this.msg[i])
		var o = data; //extract data from object
		var val = o["result"]; 

		console.log('val '+JSON.stringify(val))
	
		var val2 = val.map(a => a.avg);		//extract data from array object		
	    if (val2[0]===null)
		  this.msg[i] =0
	    else
		   this.msg[i] =val2[0].toFixed(1);
	
		
		} 
		
  

	
	})
	
   }
	
  else {
        // this.clickMessage = `Need to login first!  Book with title: ${book[i].favlist[0].title} is pressed!`;
        // window.alert( this.clickMessage)
	    //this.ngOnInit()
	}
   
   } // end getAvg
   
   valueChanged(i:number,book:Object,value: any) {
        console.log('Selection Changed: ' + value);
	if(this.session.getItem("username")!=undefined)
	{let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	 let id =i
	 let bookfav=book
	  if(bookfav[i].favlist[0].review===undefined)
             bookfav[i].favlist[0].review = " "	  
	  bookfav[i].favlist[0].star = value
	// console.log('received txt '+receivedTxt)
	
	 this.data.addFav(`${a}`,`${b}`, id, bookfav,4).subscribe(data=>{
		this.clickMessage = 'Rate received! Thank you';
		window.alert( this.clickMessage)
		this.ngOnInit()
	})}
  else {
         this.clickMessage = `Need to login first!  Book with title: ${book[i].favlist[0].title} is pressed!`;
         window.alert( this.clickMessage)
	    this.ngOnInit()
	}
   }
}
