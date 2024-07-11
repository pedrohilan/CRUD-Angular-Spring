import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Course } from "../models/course";
import { CoursesService } from "../services/courses.service";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CourseResolver implements Resolve<Course> {
  constructor(private service: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course>|Promise<Course>|Course {
    if(route.params && route.params["id"])
      return this.service.getById(route.params["id"]);
    else
      return of({_id: '', name: '', category: ''});
  }
}
