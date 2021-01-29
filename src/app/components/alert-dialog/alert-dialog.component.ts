import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {AlertData} from '../../models/Constant';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  alertData:AlertData;
  constructor(private dialogRef:MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) data: AlertData) {
    // console.log(['hello from AlertDialogComponent',data]);
    this.alertData = data;
  }
  ngOnInit() {
  }
  confirm(){
    this.dialogRef.close({confirm:true});
  }
  cancel(){
    this.dialogRef.close({confirm:false});
  }
}
