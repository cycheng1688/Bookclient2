import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MySessionService} from '../session-storage.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-inputtext',
  template: `
    <input #newSearch
      (keyup.enter)="addSearch(newSearch.value)"
      (blur)="addSearch(newSearch.value); newSearch.value='' ">
    <button (click)="addSearch(newSearch.value)">Search</button>
<ul *ngIf="books">
<li *ngFor="let book of books; index as i">
<h3>Title: {{ book.title }} <button (click)="addFavHandler(i, books,1)">  Add to Favourites</button></h3>
<h3>Author: {{ book.authors[0] }}</h3>
<p><strong>Description:</strong>{{ book.description}} </p>
</li>
</ul>
  
  `
})
export class InputtextComponent {

clickMessage = '';
books:Object;
  constructor(private data: DataService,private session: MySessionService, private router: Router) { }

 addSearch(newSearch:string){
	if(newSearch!=''){
  this.data.getBooks(`${newSearch}`).subscribe(data=>{
  
  this.books = data;			
//  console.log(this.books)
	})
	}
  }
 
addFavHandler(i:number,book:Object,choice:number)
{if(this.session&&this.session.getItem("username")!=null)
	{ 
     let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	 let id =i
	 let bookfav=book
	 this.data.addFav(`${a}`,`${b}`, id, bookfav,1).subscribe(data=>{
     //this.books = JSON.stringify(data);	//error mapping as object return not array
      
	  var mess =JSON.stringify(data)
	 
	  if (mess.includes('duplicate'))
	      this.clickMessage ='Cannot have duplicate Favourite!'
	  else
	      this.clickMessage =` Book with title: ${book[i].title} is saved!`
	window.alert( this.clickMessage)
	this.router.navigate(['/favorite'])
	})}
else {
   this.clickMessage = `Need to login first!  book with title: ${book[i].title} is pressed!`;
   window.alert( this.clickMessage)
	}
}
}

