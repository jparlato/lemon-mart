import { Injectable } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { Observable } from 'rxjs'

import { SimpleDialogCompnent } from '../dialogs/simple-dialog.component'

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}
  showToast(message: string, action = 'Close', config?: MatSnackBarConfig): void {
    this.snackBar.open(message, action, config || { duration: 7000 })
  }

  showDialog(
    title: string,
    content: string,
    okText = 'OK',
    cancelText?: string,
    customConfig?: MatDialogConfig
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(
      SimpleDialogCompnent,
      customConfig || { width: '300px', data: { title, content, okText, cancelText } }
    )
    return dialogRef.afterClosed()
  }
}
