import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import {AlertDialogComponent} from '../components/alert-dialog/alert-dialog.component';


//
export interface AlertData {
  title:string;
  content:string;
  action?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private matDialg: MatDialog) { }

   confirm(alertData:AlertData){
    const dialogRef = this.matDialg.open(AlertDialogComponent,
      {
        width: '400px',
        height: '250px',
        data:alertData,
        panelClass:'alert-dialog'
      }
    );
    return dialogRef.afterClosed();
  }


}
