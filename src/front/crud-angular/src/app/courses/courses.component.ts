import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from './models/course';
import { CoursesService } from './services/courses.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CategoryPipe } from '../shared/pipes/category.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ListComponent } from './components/list/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../shared/dialogs/confirmDialog/confirmDialog.component';
import { CoursePage } from './models/course-page';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
        CategoryPipe,
        MatButtonModule,
        ListComponent,
        MatPaginatorModule
    ],
})
export class CoursesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'category', 'actions'];
  courses$: Observable<CoursePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private courseService: CoursesService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ){
    this.load();
  }

  load(event: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}){
    this.courses$ = this.courseService.list(event.pageIndex, event.pageSize).pipe(
      tap(() => {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      }),
      catchError(error => {
      console.log(error);
      this.openSnackBar(error.message, "Ok")
      return of({courses: [], totalElements: 0, totalPages: 0})
    }))
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onAdd(){
    this.router.navigate(['formulario'], {relativeTo: this.route})
  }

  onEdit(id: number){
    this.router.navigate(['editar', id], {relativeTo: this.route})
  }

  onDelete(id: number){
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: "Deseja excluir este registro?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.courseService.delete(id).subscribe(
          next => {
            this.load();
            this.openSnackBar("Excluído com sucesso", "Ok");
          },
          error => {
            this.openSnackBar("Erro ao excluir curso", "Ok");
          }
          )
      }
    })
  }
}
