import {ElementService} from '../../../services/element.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {Element} from "../../../models/Element";
import { DimensionElementDto } from 'src/app/models/DimensionElementDto';

@Component({
  selector: 'app-add-new-element',
  templateUrl: './add-new-element.component.html',
  styleUrls: ['./add-new-element.component.css']
})
export class AddNewElementComponent implements OnInit {
  checked: boolean;
  emptyInstance: DimensionElementDto = {   rate: 1, value: '', dimensionId:0,elementId:0}

  constructor(public dialogRef: MatDialogRef<AddNewElementComponent>,
              @Inject(MAT_DIALOG_DATA) public element: DimensionElementDto,
              public elementService: ElementService) {
                this.emptyInstance=Object.assign({},this.element)
              
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addElement() {

    this.dialogRef.close(this.emptyInstance)


  }
}
