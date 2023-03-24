import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  constructor(
    private _cat:CategoryService,
    private _snack:MatSnackBar,
  ) {}

  categories:any;

  ngOnInit(): void {
    this._cat.getCategories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        this._snack.open('Error in laoding categories from server', '', {
          duration:3000,
        });
      }
    );
  }

}
