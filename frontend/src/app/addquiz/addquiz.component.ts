import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Location } from "@angular/common";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../../models/index';


@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']

})
export class AddquizComponent implements OnInit {

constructor(private quizservice: QuizService, private router: Router, private location: Location ) { }

question: any[]=[];
options:any[]=[];

counter:number=0;
counter1:number=10;

correctanswer1:boolean=false;
correctanswer2:boolean=false;
correctanswer3:boolean=false;
correctanswer4:boolean=false;

  ngOnInit() {
  }

addQuestion(formvalue: any){
this.options=[];
 console.log("Form Value = " + JSON.stringify(formvalue.answer));

switch(+formvalue.answer){
case 1:{
  this.correctanswer1=true;
  break;
}
case 2:{
  this.correctanswer2=true;
  break;
}
case 3:{
  this.correctanswer3=true;
  break;
}
case 4:{
  this.correctanswer4=true;
  break;
}

}

let op1={
id:this.counter1+1,
questionId:this.counter+1,
name:formvalue.op1,
isAnswer:this.correctanswer1,
}

this.counter1+=1;

let op2={
id:this.counter1+1,
questionId:this.counter+1,
name:formvalue.op2,
isAnswer:this.correctanswer2,
}

this.counter1+=1;

let op3={
id:this.counter1+1,
questionId:this.counter+1,
name:formvalue.op3,
isAnswer:this.correctanswer3,
}

this.counter1+=1;

let op4={
id:this.counter1+1,
questionId:this.counter+1,
name:formvalue.op4,
isAnswer:this.correctanswer4,
}



this.options.push(op1);
this.options.push(op2);
this.options.push(op3);
this.options.push(op4);

let qs={
  id:this.counter+1,
  name:formvalue.qname,
  questionTypeId:1,
  options:this.options,
  questiontype:{
    id:1,
    name:"Multiple Choice",
     isActive: false
  }
}

this.counter+=1;
this.question.push(qs);
console.log(qs);

this.correctanswer1=false;
this.correctanswer2=false;
this.correctanswer3=false;
this.correctanswer4=false;

}

//  submit quiz form


  onSubmit(formvalue: any) {
    console.log("after submitting form ");
      let quiz= {
          id:5,
          name:formvalue.quizname,
          author:formvalue.authorname,
          questions:this.question,
     }
     console.log(" values of form ");
     console.log(quiz);

      this.quizservice.addquiz(quiz)
      .subscribe(()=>{
         console.log("quiz added to data base");
          this.router.navigate(['admin']);
         },
          err=>{
       console.log(err);
     });


  }
  goBack(): void {
       this.location.back();
   }


}
