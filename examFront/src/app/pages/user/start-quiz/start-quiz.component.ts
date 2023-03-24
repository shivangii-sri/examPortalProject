import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{

  constructor (
    private _locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionsService,
  ) {}

  qid:any;
  questions:any;

  marksGot=0;
  correctAnswers=0;
  attemptedQuestions=0;
  isSubmit = false;
  timer:any;

  ngOnInit(): void { 
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
    
  }

  preventBackButton(){
    //To prevent going back after starting quiz, when the coponent loads, we pass null
    history.pushState(null, 'null',location.href);
    //To prevent going back after starting quiz, again when we do pop state, we pass same null
    this._locationSt.onPopState(()=>{
      history.pushState(null, 'null', location.href);
    });
  }

  loadQuestions(){
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        // this.questions.forEach((q) => {
        //   q['givenAnswer']='';
        // });

        console.log(this.questions);
        this.startTimer();
    
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error", "error in loading question of quiz", 'error');
      }
    );
  }

  submitQuiz()
  {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info',
    }).then((e) => {
      /* Read more about isConfirmed, isDenied below */
      if (e.isConfirmed) {       
       this.evalQuiz();
      } 
      else if (e.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }  
  
  startTimer(){

    let t = window.setInterval(()=>{
      //code
      if(this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime()
  {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - (mm*60); //timer seconds - seconds
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz()
  {    
    // CALL TO SERVER TO EVALUATE !

    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));  //or use this => Number(data.marksGot.toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attemptedQuestions = data.attemptedQuestions;
        this.isSubmit=true;
      },
      (error)=>{
        console.log(error);
      }
    );

    // this.isSubmit=true;
    // //calculation
    // this.questions.forEach(q=>{
    // if(q.givenAnswer == q.answer)
    // {
    //   this.correctAnswers++;
    //   let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
    //   this.marksGot += marksSingle;
    // }

    // if(q.givenAnswer.trim() != '')
    // {
    //   this.attemptedQuestions++;
    // }
    // });

    // console.log("Correct Answer = "+ this.correctAnswers);
    // console.log(this.marksGot);
    // console.log(this.attemptedQuestions);
  }

  printPage(){
    window.print();
  }

}
