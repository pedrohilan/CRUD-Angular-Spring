import { Component, OnInit } from '@angular/core';
import { Course } from './models/course';
import { CoursesService } from './services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CategoryPipe } from '../shared/pipes/category.pipe';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    standalone: true,
    imports: [
        MatCard,
        MatToolbar,
        MatTableModule,
        AsyncPipe,
        MatProgressSpinnerModule,
        MatIconModule,
        CategoryPipe
    ],
})
export class CoursesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'category'];
  courses$: Observable<Course[]>;

  constructor(private courseService: CoursesService,private _snackBar: MatSnackBar){
    this.courses$ = this.courseService.list().pipe(catchError(error => {
      console.log(error);
      this.openSnackBar(error.message, "Ok")
      return of([])
    }))
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
