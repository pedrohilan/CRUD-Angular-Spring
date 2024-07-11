import {Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-confirm',
  templateUrl: './confirmDialog.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})

export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ){ }

 onConfirm(result: boolean): void{
  this.dialogRef.close(result);
 }
}
