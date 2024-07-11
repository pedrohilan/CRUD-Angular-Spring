import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../models/course';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    standalone: true,
    imports: [MatIconModule, MatTableModule, MatButtonModule, CategoryPipe]
})
export class ListComponent implements OnInit{
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  displayedColumns: string[] = ['id', 'name', 'category', 'actions'];

  constructor(
  ){

  }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(id: number){
    this.edit.emit(id);
  }

  onDelete(id: number){
    this.delete.emit(id);
  }
}
