import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthorService } from '../services/author.service';
import { Router } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages/module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
 
    username:string="";
    email:string="";

  constructor(
    public authService: AuthService,
    public authorService: AuthorService,
    private router: Router,
    //private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    
      if(this.authService.loggedIn()) {
        
          this.authService.getProfile().subscribe( (profile) => {
          this.username = profile.user.username; // Set username
          this.email = profile.user.email; // Set e-mail
        });
      }
  }


  onLogoutClick() {
    this.authService.logout(); // Logout user
    //this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    this.router.navigate(['/']); // Navigate back to home page
  }


 

}
