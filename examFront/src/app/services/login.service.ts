import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  //current user: which is Logged In
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //function Login user: set token in localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // isLogin : User is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false; //mans user is not logged in
    } else {
      return true;
    }
  }

  //Logout : remove token from Local Storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');    
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user details
  public setUser(user:any){
    localStorage.setItem('user' , JSON.stringify(user));
  }

  //get User 
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user roles - to get its authority : admin or normal role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
