import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId:any; //quiz Id
  qTitle:any; //quiz Title 
  questions:any;

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionsService,
    private _snack: MatSnackBar,
  ) {}

  ngOnInit(): void{
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    
    this._question.getAllQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions = data;
      },
      (error)=>{
        console.log(error);
      }
    );

  }

  //delete question
  deleteQuestion(quesId:any){
    Swal.fire({
      icon:'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title:'Are you sure to delete this question?',
    }).then(
      (result)=>{
        if(result.isConfirmed) {
          //confirm
          this._question.deleteQuestion(quesId).subscribe(
            (data)=>{
              this._snack.open('Question Deleted', '', {
                duration:3000,
              });
              this.questions = this.questions.filter((q:any)=>q.quesId != quesId);
            },
            (error)=>{
              this._snack.open('Error in deleting question', '', {
                duration:3000,
              });
              console.log(error);
            }
          );
        }
      }
    );
  }


}
