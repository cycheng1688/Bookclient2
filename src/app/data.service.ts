import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; // Import it up here
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class DataService {


constructor(private http: HttpClient) { }

  
  login_getFav(username:string,password:string, choice:number) //1:login 2:get Fav //3:add user //4:confirm user
  {
    
     const urlLogin = 'https://cors-anywhere.herokuapp.com/https://cycbookmongo.herokuapp.com/login';
	 const urlFav = 'https://cors-anywhere.herokuapp.com/https://cycbookmongo.herokuapp.com/favourites';
	 var addUser='https://cors-anywhere.herokuapp.com/https://cycbookmongo.herokuapp.com/users'
	 
	let authorizationData = 'Basic '+  btoa(`${username}:${password}`);
	  //  console.log(`${username}:${password}`+' '+choice);
	  //  console.log(authorizationData);
	

	const httpOptions = new  HttpHeaders()
    .set('Accept','application/json') 
	.set('Content-type', 'application/json')
	.set('Authorization',`${authorizationData}`)
	.set('Access-Control-Allow-Origin','*')
	.set('Access-Control-Allow-Credentials', 'true')
	.set('X-Requested-With', 'HttpRequest')
	
    console.log(JSON.stringify(httpOptions));
    let urlc=''; let confirmUrl=''
	console.log(urlc,' ',choice)
	   if(choice ==1)
	    urlc=urlLogin;
	   if (choice ==2)
	     urlc=urlFav;
	   if (choice ==3)
	    { urlc=addUser;
		 return this.http.post(urlc,{'username':`${username}`,
                               		 'password':`${password}`},{headers:httpOptions}).pipe(
         retry(1),
        catchError(this.handleError)
       );}
       if (choice ==4)
		   
		   {confirmUrl=addUser +`/confirm/${username}`
	         return this.http.post(confirmUrl,{'confirmation':`${password}`},{headers:httpOptions}).pipe(
         retry(1),
        catchError(this.handleError)
       );
		   }
	  return this.http.get(urlc,{headers:httpOptions}).pipe(
       retry(1),
       catchError(this.handleError)
     ); //login or get list of Fav
	
	} // end login_getFav

addFav(username:string, password:string,i:number,book:Object,choice:number) //1:add Fav, 2:edit 3:del
{   
      var Fav = 'https://cors-anywhere.herokuapp.com/https://cycbookmongo.herokuapp.com/favourites';
	 let authorizationData = 'Basic '+  btoa(`${username}:${password}`);
	//   console.log(`${username}:${password}`+' '+choice);
	 //  console.log(authorizationData);
	

	const httpOptions = new  HttpHeaders()
    .set('Accept','application/json') 
	.set('Content-type', 'application/json')
	.set('Authorization',`${authorizationData}`)
	.set('Access-Control-Allow-Origin','*')
	.set('Access-Control-Allow-Credentials', 'true')
	.set('X-Requested-With', 'HttpRequest')
	
	if (choice==1) //add Fav
	{   
	  // console.log('index '+i)
	  // console.log('book '+book)
	  // console.log(`book with id: ${book[i].id} is pressed!`)
	  // console.log(`book with title: ${book[i].title} is pressed!`)
	   

	   return this.http.post(Fav,{            
			   'title':`${book[i].title}`,
			   'authors':`${book[i].authors}`,
			   'description':`${book[i].description}`
	         },{headers:httpOptions}).pipe(
       retry(1),
       catchError(this.handleError)
     );
	 
	}
	
	if (choice==2) //edit Fav
	 {Fav=Fav +`/${book[i].favlist[0]._id}`
	 console.log('Fav'+Fav)
	   return this.http.put(Fav,{            
			   'title':`${book[i].title}`,
			   'authors':`${book[i].authors}`,
			   'description':`${book[i].description}`,
			   'review':`${book[i].review}`
	         },{headers:httpOptions})
	 }
	if (choice==3) //del Fav
	  {Fav=Fav +`/${book[i].favlist[0]._id}`
	   console.log('delfav '+ Fav)
	   return this.http.delete(Fav,{headers:httpOptions})}
     
  }// end addFav

 getBooks(word:string) {
	return this.http.get(`https://cycbookmongo.herokuapp.com/booksearch?q=${word}`).pipe(
       retry(1),
       catchError(this.handleError)
     );
  }//end getBooks
 
  handleError(error) {
   let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
     // client-side error
     errorMessage = `Error: ${error.error.message}`;
   } else {
     // server-side error
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   window.alert(errorMessage);
   return throwError(errorMessage);
 }
 
 } // End DataService