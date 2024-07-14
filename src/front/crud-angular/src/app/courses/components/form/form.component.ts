import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from '../../models/course';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../models/lesson';
import { FormUtilsService } from '../../../shared/forms/forms-utils.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule
  ]
})
export class FormComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ){}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  }

  private retrieveLessons(course: Course){
    const lessons = [];
    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    }else{
      lessons.push(this.createLesson())
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}){
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name,[Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    })
  }

  getLessonsFormArray(){
    return (<UntypedFormArray>this.form.get('lessons')).controls
  }

  addNewLesson(){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson())
  }

  removeLesson(index: number){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit(){
    if(this.form.invalid){
      this.formUtils.validateAllFormFields(this.form);
      return;
    }

    this.courseService.save(this.form.value).subscribe(
      result => {
        this.openSnackBar("Salvo com sucesso", "Ok");
        this.onCancel();
      },
      error => {
        this.openSnackBar("Error ao salvar", "Ok")
      }
    )
  }

  onCancel(){
    this.location.back();
  }
}
