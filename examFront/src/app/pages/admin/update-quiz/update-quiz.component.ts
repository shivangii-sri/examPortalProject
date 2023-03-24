import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  
  constructor(
    private _route:ActivatedRoute, 
    private _quiz: QuizService, 
    private _category:CategoryService,
    private _router: Router,
  ) {}

  qid = 0;
  // categories:any;

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
    // This line is fetching qid when we click on update button defined in view-quiz-component-html
    this.qid = this._route.snapshot.params['qid']; //Here the params variable should not be qId, else it will give undefined!

    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quiz = data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );

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

  public updateQuiz(){
    //validate
    this._quiz.upadteQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success' , 'Quiz updated', 'success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error', 'Error in updating quiz', 'error');
      }
    );
  }

}
