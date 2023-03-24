import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //Load get all the categories
  public getCategories() {
    return this.http.get(`${baseUrl}/category/getCategories`);
  }

  //add new category
  public addCategory(category:any){
    return this.http.post(`${baseUrl}/category/`, category);
  }
}
