import { Component, OnInit } from '@angular/core';
import { Course } from './models/course';
import { CoursesService } from './services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})

export class CoursesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'category'];
  courses: Observable<Course[]>;

  constructor(private courseService: CoursesService){
    this.courses = this.courseService.list()
  }

  ngOnInit(): void {
  }
}
