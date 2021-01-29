import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MlrrUtilityService } from 'src/app/mlrr-utility.service';
import { Correlation } from 'src/app/models/Correlation';
import { Dimension } from 'src/app/models/Dimension';
import { DimensionElementDto } from 'src/app/models/DimensionElementDto';
import { Element } from 'src/app/models/Element';
import { CorrelationService } from 'src/app/services/correlation.service';
import { DimensionService } from 'src/app/services/dimension.service';
import { ElementService } from 'src/app/services/element.service';
import { AddNewElementComponent } from '../add-new-element/add-new-element.component';

@Component({
  selector: 'app-add-new-correlation',
  templateUrl: './add-new-correlation.component.html',
  styleUrls: ['./add-new-correlation.component.css']
})
export class AddNewCorrelationComponent implements OnInit {
  dimensions: Dimension[] = [];
  panelOpenState = false;
  event: PageEvent;
  list: Dimension;
  elementControl: FormControl;
  correlatedElement: string;
  correlatedElementsNames: DimensionElementDto[] = [];
  groups: DimensionElementDto[][] = [];
  formArray: FormControl[] = []
  constructor(public dialogRef: MatDialogRef<AddNewElementComponent>,
    @Inject(MAT_DIALOG_DATA) public element: Element,
    public dimensionService: DimensionService,
    private elementService: ElementService,
    private correlationService: CorrelationService,
    private mlrrUtility: MlrrUtilityService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dimensions = this.dimensionService.dimensions;
    // console.log("dimensions: ", this.dimensions);  

    this.dimensionService.getAllDimensionElements().subscribe((data: DimensionElementDto[]) => {
      this.groups = this.mlrrUtility.groupBy(data, "dimensionId")
      this.groups.forEach(item => {
        // this.getDimensionNameAndFromList(item)
        let dimensionId = item[0].dimensionId
        let dimensionName = item[0].dimensionName
        let x: DimensionElementDto = { dimensionId: dimensionId, dimensionName: dimensionName, value: 'NONE', elementId: -1, rate: 0 }
        item.push(x)
        this.formArray.push(new FormControl())
      })

    })
    //control for sellecting elements
    this.elementControl = new FormControl('');
    //just for testing setting dimensions lists of elements

    // this.dimensions.forEach(dim=>{
    //   let i = this.dimensions.indexOf(dim);
    //   dim.elements = this.elementService.elements;
    //   dim.elements.forEach(element => {
    //     element.dimension_id = i;
    //   });
    // });

    for (let index = 0; index < this.dimensions.length; index++) {
      let i = index;
      this.list = this.dimensions[index];
      let nestedList = this.list.elements = this.elementService.elements;
      let j = nestedList.length;
      for (let index1 = 0; index1 < j; index1++) {
        const element = nestedList[index1];
        element.dimension_id = i;
      }

      //    console.log("list: ", this.list);

    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  //reading input elements
  onElementChange(event: any) {
    let e: DimensionElementDto = new DimensionElementDto();
    e = event.value as DimensionElementDto;
    let dimension_id: number = e.dimensionId

    if (this.correlatedElementsNames.length <= 0 && e.elementId != -1) {
      this.correlatedElementsNames.push(e);
    } else if (e.elementId != -1) {
      this.correlatedElementsNames = this.correlatedElementsNames.filter(item => item.dimensionId != dimension_id)
      this.correlatedElementsNames.push(e)
    }
    else if (e.elementId == -1) {
      this.correlatedElementsNames = this.correlatedElementsNames.filter(item => item.dimensionId != dimension_id)

    }
    console.log(this.correlatedElementsNames)
  }

  Correlate() {
    console.log("correlation result: ", this.correlatedElementsNames);
  this.correlationService.addNewCorrelation(this.correlatedElementsNames).subscribe(data=>{
    console.log(data)
    this.dialogRef.close()
  })
  }
  _groupName(group:DimensionElementDto[]){
    if(group&&group.length>=0){
      return group[0].dimensionName
    }
    return "No name"

  }
}
