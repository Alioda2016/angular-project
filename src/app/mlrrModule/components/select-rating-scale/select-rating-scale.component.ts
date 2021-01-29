import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StatusGroup} from "../../../models/StatusGroup";
import {RatingScale} from "../../models/scale.boundry.model";
import {Status} from "../../../models/Status";
import { MLRRconstants } from 'src/app/MLRRconstants';


@Component({
  selector: 'app-select-rating-scale',
  templateUrl: './select-rating-scale.component.html',
  styleUrls: ['./select-rating-scale.component.css']
})
export class SelectRatingScaleComponent implements OnInit {
  @Input()
  elementRate = 1
  statusGroups: StatusGroup[] = []
  @Output() changeRateEvent = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
    this.formatRatingScale()
  }


  formatRatingScale() {
    let RatingScale = localStorage.getItem(MLRRconstants.RatingScale)
    if (RatingScale) {
      let RatingScaleJson: RatingScale = JSON.parse(RatingScale)

      this.setRatingScale(RatingScaleJson);
    } else {
      let defaultRatingtScale: RatingScale = {maxScaleControl: 10, highBoundryControl: 7, lowBoundryControl: 3}
      this.setRatingScale(defaultRatingtScale)
    }
  }

  private setRatingScale(RatingScaleJson: RatingScale) {
    let lowBoundryControl = RatingScaleJson.lowBoundryControl
    let highBoundryControl = RatingScaleJson.highBoundryControl
    let maxScaleControl = RatingScaleJson.maxScaleControl
    let lowStatus: Status[] = []
    let mediumStatus: Status[] = []
    let highStatus: Status[] = []
    for (let i = 0; i <= lowBoundryControl; i++) {
      let status: Status = {viewValue: `Low(${i})`, value: i}
      lowStatus.push(status)
    }
    for (let i = lowBoundryControl + 1; i < highBoundryControl; i++) {
      let status: Status = {viewValue: `Medium(${i})`, value: i}
      mediumStatus.push(status)
    }
    for (let i = highBoundryControl; i <= maxScaleControl; i++) {
      let status: Status = {viewValue: `High(${i})`, value: i}
      highStatus.push(status)
    }
    let lowStatusGroup: StatusGroup = {
      name: 'Low',
      status: [...lowStatus]
    }
    let mediumStatusGroup: StatusGroup = {
      name: 'Medium',
      status: [...mediumStatus]
    }
    let highStatusGroup: StatusGroup = {
      name: 'High',
      status: [...highStatus]
    }
    this.statusGroups.push(lowStatusGroup, mediumStatusGroup, highStatusGroup)
  }
  changeRate(event:any){
    console.log(event)
    this.elementRate=event.value
    console.log(this.elementRate)
    this.changeRateEvent.emit(this.elementRate)
  }
}
