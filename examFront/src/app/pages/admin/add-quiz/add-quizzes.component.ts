import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit{
  constructor(
    private _quiz:QuizService, 
    private _category:CategoryService,
    private _snack:MatSnackBar
  ) {}
  
  quiz = {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
      title:'',
    },
  };

  categories=[
    {
      cid:23,
      title:'Programming'
    }
  ];

  

   ngOnInit(): void {
    this._category.getCategories().subscribe(
      (data:any)=>{
        //catgeories load
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!' , 'error in laoding data from server', 'error');
      }
    );
      
   }

   //Function called on submit button in Add Quiz component - To add quiz
   addQuiz()
  {
    if(this.quiz.title.trim() == '' || this.quiz.title == null){
      this._snack.open('Title required! ', '',{
        duration:2000
      });
      return;
    }

    //all done
    this._quiz.addQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success !", 'Quiz is added successfully', 'success');
        this.quiz = {
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:'',
            title:'',
          },
        };
      },
      (error)=>{
        Swal.fire('Error !', 'Server error !', 'error');
        console.log(error);
      }
    );
  }

  
  

}
