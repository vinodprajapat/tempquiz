import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgModule } from '@angular/core';


import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthorComponent } from './authorlogin/authorlogin';
import {AddquizComponent} from './addquiz/addquiz.component';
import { AdminComponent } from './author/author.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AdminAuthGuard } from './guards/admin.guard';


import { NavbarComponent } from './nav/navbar';
import { ViewQuizComponent } from './adminquiz/viewquiz.component';
import { UserProfile } from './userprofile/userprofile.component';

const appRoutes: Routes = [
  {  path: 'quiz', component: QuizComponent,
       canActivate: [AuthGuard] 
  },

  {  path: 'profile', component: UserProfile,
      canActivate: [AuthGuard] 
  },

  {  path: '', component: HomeComponent }, // Default Route,

  {  path: 'register', component: RegisterComponent,// Register Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },

  {
    path: 'login',
    component: LoginComponent,// Login Route
     canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },

  {
    path: 'admin', component:AdminComponent,
    canActivate: [AdminAuthGuard] 
  },

 {
   path:'addquiz', component:AddquizComponent,
   canActivate: [AdminAuthGuard] 
 },

  {
    path: 'authorlogin',
    component: AuthorComponent,// Login Route
     canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
{path: 'navbar', component: NavbarComponent
},

// { path: '**', component: HomeComponent },
{   path: 'viewquiz/:id', component: ViewQuizComponent,
    canActivate: [AdminAuthGuard]
 }

];

export const routing = RouterModule.forRoot(appRoutes);
