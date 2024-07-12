import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    MatSnackBarModule
  ]
})
export class FormComponent implements OnInit{
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    if(course._id != null){
      this.form.setValue({
        _id: course._id,
        name: course.name,
        category: course.category
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit(){
    if(this.form.invalid){
      this.openSnackBar("Preencha os campos corretamente!", "Ok");
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

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }
    if(field?.hasError('minlength')){
      const requiredLength = field?.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }
    if(field?.hasError('maxlength')){
      const requiredLength = field?.errors ? field.errors['maxlength']['requiredLength'] : 5;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }
    return '';
  }
}
