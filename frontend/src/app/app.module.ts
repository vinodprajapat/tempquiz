import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing }  from './app.routing';
import { AppComponent } from './app.component';

import { AddquizComponent } from './addquiz/addquiz.component';
import { AdminComponent } from './author/author.component'
import { NavbarComponent } from './nav/navbar';

import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { QuizService } from './services/quiz.service';
import { HelperService } from './services/helper.service';
import { AuthorService } from './services/author.service';
import { LoginComponent } from './login/login.component';
import { AuthorComponent } from './authorlogin/authorlogin';
import { FlashMessagesModule } from 'angular2-flash-messages/module';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AdminAuthGuard } from './guards/admin.guard';

import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { ViewQuizComponent } from './adminquiz/viewquiz.component';
import { UserProfile } from './userprofile/userprofile.component';
//import { NavbarComponent } from './nav/navbar';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    AuthorComponent,
    AddquizComponent,
    AdminComponent,
    ViewQuizComponent,
    UserProfile
  //  NavbarComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    FlashMessagesModule
  ],
  providers: [AuthService, AuthorService, AuthGuard, AdminAuthGuard, NotAuthGuard, QuizService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
