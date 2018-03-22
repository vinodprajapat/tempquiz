import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    id: number;
    name: string;
    author: string;
    config: QuizConfig;
    questions: Question[];

   

    constructor(data: any) {
        if (data) {
           data.forEach((temp)=>{
             this.id=temp.id;
             this.name=temp.name;
             this.author = temp.author;
             this.questions = [];
             temp.questions.forEach(q => {
                 this.questions.push(new Question(q));
            });
           })
        }
    }
}
