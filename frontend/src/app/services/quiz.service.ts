import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';


import 'rxjs/add/operator/map';
@Injectable()
export class QuizService {

  constructor(private http: Http) { }

  get(url: Number) {
    return this.http.get('http://localhost:8080/admin/quiz/'+url).map(res => res.json() );
  }

 

getquiz(){
   return this.http.get('http://localhost:8080/admin/quiz')
     .map(res=> res.json());
}

  addquiz( newquiz: any) {   
   console.log(newquiz);
   var headers= new Headers();
   headers.append('Content-Type', 'application/json');
   return this.http.post('http://localhost:8080/admin/addquiz',newquiz, {headers: headers})
   .map(res=>res.json());
  }

  deletequiz(id){
     return this.http.delete('http://localhost:8080/admin/deletequiz/'+id)
    .map(res=>res.json());
  }

  savescore(quizscore){ 
    var headers= new Headers();
   headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/admin/addscore', quizscore, {headers: headers}).map(res => res.json());
  }
}
