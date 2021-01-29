import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultRiskRating } from 'src/app/mlrrModule/models/result.risk.rating.model';

@Component({
  selector: 'app-display-risk-rating-dialog',
  templateUrl: './display-risk-rating-dialog.component.html',
  styleUrls: ['./display-risk-rating-dialog.component.css']
})
export class DisplayRiskRatingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DisplayRiskRatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResultRiskRating) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

