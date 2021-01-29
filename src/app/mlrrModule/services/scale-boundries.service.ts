import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScaleBoundry } from '../models/scale.boundry.model';

@Injectable({ providedIn: 'root' })
export class ScaleBoundriesService {

  ScaleBoundryFormGroup: FormGroup = new FormGroup({
    maxScaleControl: new FormControl(null, [Validators.required]),
    lowBoundryControl: new FormControl(null, [Validators.required]),
    highBoundryControl: new FormControl(null, [Validators.required]),
  }, { validators: this.scaleBoundryValidator });


  constructor() { }

  initScaleBoundryFormGroup(maxScaleControl: any,
    lowBoundryControl: any,
    highBoundryControl: any): FormGroup {
    return new FormGroup({
      maxScaleControl: new FormControl(maxScaleControl, [Validators.required]),
      lowBoundryControl: new FormControl(lowBoundryControl, [Validators.required]),
      highBoundryControl: new FormControl(highBoundryControl, [Validators.required]),
    }, { validators: this.scaleBoundryValidator });
  }

  scaleBoundryValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // Reading value input from form
    let maxScaleInput = +(control.get('maxScaleControl')?.value)||0;
    let lowBoundryInput = +(control.get('lowBoundryControl')?.value)||0;
    let highBoundryInput = +(control.get('highBoundryControl')?.value)||0;

    // validation the form and submit
    if ((maxScaleInput == 0 || maxScaleInput == 0 )||( highBoundryInput == 0)) {
      return { 'Max scale, Low scale and High scale must be greater than (0)': true };

    } else if ((maxScaleInput <= lowBoundryInput) || (maxScaleInput <= highBoundryInput)) {
      return { 'Max scale must be greater than Low boundry and High boundry': true };

    }
    else if ((highBoundryInput <= lowBoundryInput) ||( highBoundryInput == lowBoundryInput)) {
      return { 'High boundry must be greater than Low boundry': true };

    } else {
      return null;
    }

  }



  findScaleBoundryBykeyConfiguration(scaleBoundries: ScaleBoundry[], keyConfiguration: string): ScaleBoundry {
    let index = scaleBoundries.findIndex(scaleBoundry => scaleBoundry.keyConfiguration == keyConfiguration);
    return scaleBoundries[index];
  }

  newScaleBoundries(newScaleBoundries: ScaleBoundry[],
    maxScaleInput: number,
    lowBoundryInput: number,
    highBoundryInput: number): ScaleBoundry[] {

    let newMaxScale: ScaleBoundry = {
      id: 0,
      keyConfiguration: 'MaxScale',
      valueConfiguration: maxScaleInput,
      category: 'scaleBoundry',
    }
    newScaleBoundries.push(newMaxScale);

    let newLowScaleBoundry: ScaleBoundry = {
      id: 0,
      keyConfiguration: 'LowBoundry',
      valueConfiguration: lowBoundryInput,
      category: 'scaleBoundry',
    }
    newScaleBoundries.push(newLowScaleBoundry);

    let newHighScaleBoundry: ScaleBoundry = {
      id: 0,
      keyConfiguration: 'HighBoundry',
      valueConfiguration: highBoundryInput,
      category: 'scaleBoundry',
    }
    newScaleBoundries.push(newHighScaleBoundry);
    return newScaleBoundries;
  }

  updateScaleBoundries(updatedScaleBoundries: ScaleBoundry[],
    maxScale: ScaleBoundry,
    lowBoundry: ScaleBoundry,
    highBoundry: ScaleBoundry): ScaleBoundry[] {
    let newMaxScale: ScaleBoundry = {
      id: maxScale?.id!,
      keyConfiguration: maxScale?.keyConfiguration!,
      valueConfiguration: maxScale.valueConfiguration,
      category: maxScale?.category!,
    }
    updatedScaleBoundries.push(newMaxScale);

    let newLowScaleBoundry: ScaleBoundry = {
      id: lowBoundry?.id!,
      keyConfiguration: lowBoundry?.keyConfiguration!,
      valueConfiguration: lowBoundry.valueConfiguration,
      category: lowBoundry?.category!,
    }
    updatedScaleBoundries.push(newLowScaleBoundry);

    let newHighScaleBoundry: ScaleBoundry = {
      id: highBoundry?.id!,
      keyConfiguration: highBoundry?.keyConfiguration!,
      valueConfiguration: highBoundry.valueConfiguration,
      category: highBoundry?.category!,
    }
    updatedScaleBoundries.push(newHighScaleBoundry);
    return updatedScaleBoundries;
  }

}