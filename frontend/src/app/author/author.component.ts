import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgModule } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { AuthorService } from '../services/author.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../../models/index';


@Component({
  selector: 'app-addquiz',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']

})

export class AdminComponent implements OnInit {
   quizes: any[];
   username = '';
   email = '';
      constructor(private quizservice : QuizService, public authService: AuthorService, private router: Router){ }

        ngOnInit() {
          this.quizservice.getquiz()
               .subscribe(quizes=>{
                   this.quizes=quizes;
        });
        this.authService.getProfile().subscribe(profile => {
         this.username = profile.user.username; // Set username
         this.email = profile.user.email; // Set e-mail
    });
    }

    deletequiz(id){
        this.quizservice.deletequiz(id).subscribe();

          this.quizservice.getquiz()
               .subscribe(quizes=>{
                   this.quizes=quizes;
        });
    }
    onLogoutClick() {
      this.authService.logout(); // Logout user
      //this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
      this.router.navigate(['/']); // Navigate back to home page
    }

}
