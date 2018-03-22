import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { AuthService } from '../services/auth.service';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../../models/index';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  username = '';
  email = '';
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = '';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

totalscore:number=0;
maxscore: number=0;


comments: any[];

  constructor(private quizService: QuizService,  private location: Location,   public authService: AuthService, private router: Router,) { }

    ngOnInit() {
          this.quizService.getquiz().
                 subscribe(quizes=>{
                  this.quizes=quizes;
                 // console.log(this.quizes);
               });

 
               this.authService.getProfile().subscribe(profile => {
               this.username = profile.user.username; // Set username
               this.email = profile.user.email; // Set e-mail
              });
       }

    onLogoutClick() {
     this.authService.logout(); // Logout user
  //    //this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
     this.router.navigate(['/']); // Navigate back to home page
   }

  loadQuiz(quizid: Number) {
    console.log(quizid);

      this.quizService.get(quizid).subscribe(res => {
    
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
    });
    this.mode = 'quiz';
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      setTimeout(()=>{
        this.goTo(this.pager.index + 1);
      },500)
      
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
       if(question.options.every(x => x.selected === x.isAnswer)){
        return 'correct';
        }
      else{
         return 'wrong';
      }
     
  }

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.maxscore = this.quiz.questions.length;
    this.maxscore*=3;

    this.quiz.questions.map(x=>{
       if(this.isCorrect(x)=='correct'){
         this.totalscore+=3;
       }
       else{
         this.totalscore-=1;
       }  
    });
    
    var quizscore = {
      username: this.username,
      id: this.quiz.id,
      name: this.quiz.name,
      score: this.totalscore,
      date: new Date()
    }

    this.quizService.savescore(quizscore).subscribe(res=>{
      console.log(" score is sub,itted ");
    });

    this.mode = 'result';
  }

   goBack(): void {
         if(this.mode=='review')
             this.mode='quiz';
         else
         this.mode='';
     
        this.totalscore=0;
        this.maxscore=0;

        this.pager.index=0;
        this.pager.size=1;
        this.pager.count=1;
    }
}
