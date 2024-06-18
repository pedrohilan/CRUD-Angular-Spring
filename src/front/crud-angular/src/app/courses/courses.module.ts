import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CoursesService } from './services/courses.service';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, AppMaterialModule],
  providers: [CoursesService]
})
export class CoursesModule {}
