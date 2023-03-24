import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http:HttpClient) { }

  //get all questions of quiz - used by Admin
  //getAllQuestionOfQuiz
  public getAllQuestionOfQuiz(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  // get noOfQuestions Questions of any Quiz - used by normal user to start quiz
  public getQuestionOfQuizForTest(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/question/` , question);
  }

  //delete question
  public deleteQuestion(questionId:any){
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }
  
  //eval quiz
  public evalQuiz(questions:any){
    return this.http.post(`${baseUrl}/question/evalQuiz`, questions);
  }
}
