import { Injectable } from '@angular/core';
import { MLRRconstants } from './MLRRconstants';
import { RatingScale } from './mlrrModule/models/scale.boundry.model';

@Injectable({
  providedIn: 'root'
})
export class MlrrUtilityService {

  constructor() { }
  getRatingScale():RatingScale {
    let RatingScale = localStorage.getItem(MLRRconstants.RatingScale)
    let RatingScaleJson: RatingScale 
    if (RatingScale) {
       RatingScaleJson = JSON.parse(RatingScale)

    } else {
       RatingScaleJson = {maxScaleControl: 10, highBoundryControl: 7, lowBoundryControl: 3}
    }
    return RatingScaleJson
  }
  calculateRating(ratingValue: number) {
    let RatingScale = this.getRatingScale()
    let highBoundryControl = RatingScale.highBoundryControl
    let lowBoundryControl = RatingScale.lowBoundryControl
    let maxScaleControl = RatingScale.maxScaleControl
    if (ratingValue < lowBoundryControl) {
      return "LOW"
    } else if (ratingValue >= lowBoundryControl && ratingValue < highBoundryControl) {
      return "MEDIUM"
    } else if (ratingValue >= highBoundryControl) {
      return "HIGH"
    }
    return ""
  }
//  groupBy(arr:any[], prop:string) {
//     // const map = new Map(Array.from(arr, obj => [obj[prop], []]));
//     // arr. forEach(obj => map.get(obj[prop]).push(obj));
//     // return Array.from(map.values());
//     let groups = arr.reduce((groups, item) => {
//       const group = (groups[item.group] || []);
//       group.push(item);
//       groups[item.group] = group;
//       return groups;
//     }, {});
//    return groups
// }
//
groupBy(collection:any[], property:string) {
  var i = 0, val, index,
      values = [], result = [];
  for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1)
          result[index].push(collection[i]);
      else {
          values.push(val);
          result.push([collection[i]]);
      }
  }
  return result;
} 
}
