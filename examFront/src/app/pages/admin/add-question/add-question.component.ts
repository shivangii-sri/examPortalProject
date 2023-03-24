import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionsService,
  ) {}

  qid : any;
  qTitle:any;
  public Editor = ClassicEditor;

  question= {
    quiz: {
      qid:1,
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid']= this.qid;
  }

  addQuestion(){

    if(this.question.content.trim()=='' || this.question.content == null){
      return ;
    }
    if(this.question.option1.trim()=='' || this.question.option1 == null){
      return ;
    }
    if(this.question.option2.trim()=='' || this.question.option2 == null){
      return ;
    }
    if(this.question.answer.trim()=='' || this.question.answer == null){
      return ;
    }
    //add question
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success' , 'Question added' , 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error)=>{
        Swal.fire('Error', 'error in adding question', 'error');
      }
    );
  }
}
