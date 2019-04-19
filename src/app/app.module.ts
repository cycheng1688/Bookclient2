import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { InputtextComponent } from './inputtext/inputtext.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { SESSION_STORAGE } from 'ngx-webstorage-service';
import { Inputtext2Component } from './inputtext2/inputtext2.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    FavoriteComponent,
    HomeComponent,
    InputtextComponent,
    Inputtext2Component,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	ReactiveFormsModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
