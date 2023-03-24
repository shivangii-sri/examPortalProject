import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  //Load all quizzes
  public getQuizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  //add new quiz
  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`, quiz);
  }

  //delete quiz
  public deleteQuiz(qid:any){
    return this.http.delete(`${baseUrl}/quiz/${qid}`);
  }

  //get single quiz
  public getQuiz(qid:any){
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }
  
  //get quizzes of category
  public getQuizzesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }
  //get active quizzes
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }
  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

  //update quiz
  public upadteQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`, quiz);
  }
}
