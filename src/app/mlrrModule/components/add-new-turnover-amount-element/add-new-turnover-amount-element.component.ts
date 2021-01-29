import {Component, Inject, OnInit} from '@angular/core';
import {elementType, TurnoverAmountElementModel} from "../../models/TurnoverAmountElement.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-turnover-amount-element',
  templateUrl: './add-new-turnover-amount-element.component.html',
  styleUrls: ['./add-new-turnover-amount-element.component.css']
})
export class AddNewTurnoverAmountElementComponent implements OnInit {
  turnoverAmountElement: TurnoverAmountElementModel = {dimensionId:1, threshold: 0, type: elementType.Individual, elementValue: '',rate:1,id:0}
  occupationsList: string[] = [
    "salesperson",
    "salesman", "cashier", "seller", "retailer", "merchant", "distributor", "greengrocer", "physician",
    "cardiologist",
    "pharmacist",
    "nurse",
    "professor",
    "teacher",
    "student"


  ];
  industryList: string[] = ["Information Technology",
    "Health Care", "Financials", "Banking",
    "Consumer Discretionary", "Communication Services",
     "Consumer Staples", "Energy",
    "Real Estate"];
  elementType: any[] = [elementType.Individual, elementType.Organization];
  dimensionId:number=0
  constructor(public dialogRef: MatDialogRef<AddNewTurnoverAmountElementComponent>,
              @Inject(MAT_DIALOG_DATA) public element: TurnoverAmountElementModel) {
                this.turnoverAmountElement=Object.assign({},this.element)
  }

  ngOnInit(): void {
  }

  addNewElement() {
    this.dialogRef.close(this.turnoverAmountElement)
  }

  cancel() {
    this.dialogRef.close()
  }

  isIndividualType(): boolean {
    return this.dimensionId == environment.individualTurnoveramountId
  }
}
