import {DimensionService} from '../../../services/dimension.service';
import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PartyColumnNamesService } from 'src/app/services/party-column-names.service';
import { PageEvent } from '@angular/material/paginator';
import { Dimension } from 'src/app/models/Dimension';

@Component({
  selector: 'app-add-new-dimension',
  templateUrl: './add-new-dimension.component.html',
  styleUrls: ['./add-new-dimension.component.css']
})
export class AddNewDimensionComponent implements OnInit {
 dimension:Dimension = {description:'',id:0, weight: 0, sourceColumn: '', name:'',
            enabled: false, individual: false, organization: false, elements:[]};
 type: boolean
  constructor(public dialogRef: MatDialogRef<AddNewDimensionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dimensionService: DimensionService) {
              this.dimension=data.dimensionValue
              this.type=data.type
              console.log("dimensionValue: ", this.dimension);
  }

  ngOnInit(): void {
    this.columnNames=PartyColumnNamesService.getColumnNames()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changePosition() {
    this.dialogRef.updatePosition({top: '20px'});
  }

  addDimension(dimensionForm: NgForm) {
    this.dimensionService.saveDimension(dimensionForm.value).subscribe(
      (data)=>{
        this.dialogRef.close(data)
      }
    )
  }

  updateDimension(){
    this.dimensionService.updateDimension(this.dimension).subscribe(
      (data)=>{
        this.dialogRef.close(data)
      }
    )
  }

  columnNames: string[] = []
}
