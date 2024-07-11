import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(this.API)
      .pipe();
  }

  save(record: Partial<Course>): Observable<Course>{
    if(record._id){
      return this.edit(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private edit(record: Partial<Course>): Observable<Course> {
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  getById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`).pipe();
  }

  delete(id: number){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
