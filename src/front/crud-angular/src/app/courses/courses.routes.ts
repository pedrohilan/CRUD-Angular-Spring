import { Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { FormComponent } from './form/form.component';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: 'formulario',
    component: FormComponent,
  },
];
