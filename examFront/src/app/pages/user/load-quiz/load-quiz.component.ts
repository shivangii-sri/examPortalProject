import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
  ) {}

  catId:any;
  quizzes:any;

  ngOnInit(): void {
    

    this._route.params.subscribe((params)=>{
      this.catId = params['catId'];

      if(this.catId == 0){
        //Load all the quiz
       this._quiz.getActiveQuizzes().subscribe(
         (data:any)=>{
           this.quizzes = data;
           console.log(this.quizzes);
         },
         (error)=>{
           console.log('Error', 'error in laoding quizzes', 'error');
         }
       );
     }
     else{
      console.log("Load specific quiz");
      
      this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
        (data:any)=>{
          this.quizzes=data;
        },
        (error:any)=>{
          alert("error in laoding quiz data");
        }
      );
    }
    });

    
  }

}
