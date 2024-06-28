import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./courses/courses.routes').then((m) => m.COURSES_ROUTES),
  },
];
