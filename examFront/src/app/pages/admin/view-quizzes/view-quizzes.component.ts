import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{
  
  constructor(private _quiz: QuizService) {}

  quizzes = [
    {
      qid : 14,
      title : 'Test',
      description : 'Test descrp',
      maxMarks : '100',
      numberOfQuestions : '25',
      active:'',
      category:{
        title:'',

      },
    }
  ]
 

    ngOnInit(): void {

      //Assigning quiz data when we do getQuizzes API , data storing into quizzes local variable 
    this._quiz.getQuizzes().subscribe((data:any)=>{
      this.quizzes = data;
      console.log(this.quizzes);
    },
    (error)=> {
      console.log(error);
      Swal.fire('Error !!', 'Error in loading data', 'error');
    }
    );
  }

  //delete quiz
  deleteQuiz(qid:any){

    Swal.fire({
      icon: 'info',
      title : "Are you sure ?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._quiz.deleteQuiz(qid).subscribe(
          (data)=>{
            // below line filters out the quiz which is gettign delted, so that on clicking delete button, the deleted quiz doesnt show
            this.quizzes = this.quizzes.filter((quiz)=>quiz.qid != qid);
            Swal.fire('Success', 'Quiz deleted', 'success');
          },
          (error)=>{
            Swal.fire('Error', 'Error in deleting quiz' , 'error');
          }
        );
      }
    });
    
  }


}
