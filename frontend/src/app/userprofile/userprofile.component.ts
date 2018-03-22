import {Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css'],
    providers:[AuthService ]
})

export class UserProfile implements OnInit{

    first_name ='';
    last_name='';
    email='';
    username='';
    mobile='';
    quizhistory=[{}];

constructor(private userservice : AuthService, private location : Location, private router: Router){}
    ngOnInit(){
        this.userservice.getProfile().subscribe(profile=>{
          this.first_name= profile.user.firstname;
          this.last_name=profile.user.lastname;
          this.email=profile.user.email;
          this.username=profile.user.username;
          this.mobile=profile.user.mobile;
         this.quizhistory= profile.user.attempted_quizes;
        })

      
    }

    onLogoutClick() {
        this.userservice.logout(); // Logout user
     //    //this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
        this.router.navigate(['/']); // Navigate back to home page
      }


}