import { Component, OnInit } from '@angular/core';
import { Course } from './models/course';
import { CoursesService } from './services/courses.service';
import { Observable, catchError, of } from 'rxjs';
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
        ListComponent
    ],
})
export class CoursesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'category', 'actions'];
  courses$: Observable<Course[]> | null = null;

  constructor(
    private courseService: CoursesService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ){
    this.load();
  }

  load(){
    this.courses$ = this.courseService.list().pipe(catchError(error => {
      console.log(error);
      this.openSnackBar(error.message, "Ok")
      return of([])
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
