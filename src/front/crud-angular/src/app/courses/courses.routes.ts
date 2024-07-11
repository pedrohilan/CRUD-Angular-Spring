import { Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { FormComponent } from './components/form/form.component';
import { CourseResolver } from './guards/courses.resolver';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: 'formulario',
    resolve: {course: CourseResolver},
    component: FormComponent,
  },
  {
    path: 'editar/:id',
    resolve: {course: CourseResolver},
    component: FormComponent
  }
];
