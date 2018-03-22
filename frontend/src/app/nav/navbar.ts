import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class NavbarComponent implements OnInit {
  firstname = '';
  lastname = '';
  mobile = '';
  username = '';
  email = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    //private flashMessagesService: FlashMessagesService
  ) { }

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    //this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    this.router.navigate(['/']); // Navigate back to home page
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.firstname=profile.user.firstname;
      this.lastname=profile.user.lastname;
      this.mobile=profile.user.mobile;

     this.username = profile.user.username; // Set username
     this.email = profile.user.email; // Set e-mail
});
  }

}
