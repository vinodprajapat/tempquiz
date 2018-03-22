import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
//import { AuthService } from '../services/auth.service';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../../models/index';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-quiz',
  templateUrl: './viewquiz.component.html',
  styleUrls: ['./viewquiz.component.css'],
  providers: [QuizService]
})

export class ViewQuizComponent implements OnInit {
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

 id:any=0;

  constructor(private quizService: QuizService,  private location: Location,   /*public authService: AuthService,*/ private route: ActivatedRoute) { }

    ngOnInit() {

         this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
        });

       this.quizService.get(this.id).subscribe(res => {
       console.log("responce from server ");
       console.log(res);
    
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
      this.goTo(this.pager.index + 1);
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
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };



   goBack(): void {
        this.location.back();
    }
}
