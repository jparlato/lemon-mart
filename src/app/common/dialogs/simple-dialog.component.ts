import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  // prettier-ignor
  template: ` <h2 mat-MatDialog-title>{{ data.title }}</h2>
    <div mat-dialog-content>
      <p>{{ data.content }}</p>
    </div>

    <mat-dialog-actions>
      <span class="flex-spacer"> </span>

      <button mat-button mat-dialog-close *ngIf="data.cancelText">
        {{ data.cancelText }}
      </button>

      <button
        mat-button
        mat-button
        mat-button-raised
        color="primary"
        [mat-dialog-close]="true"
        cdkFocusInitial
      >
        {{ data.okText }}
      </button>
    </mat-dialog-actions>`,
})

// tslint:disable-next-line: component-class-suffix
export class SimpleDialogCompnent {
  constructor(
    public dialogRef: MatDialogRef<SimpleDialogCompnent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
