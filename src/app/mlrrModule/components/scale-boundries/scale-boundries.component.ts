import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ScaleBoundry} from '../../models/scale.boundry.model';
import {ScaleBoundriesService} from '../../services/scale-boundries.service';
import {ScaleBoundryDataStorage} from './scale-boundries-data-storage';
import {MLRRconstants} from "../../../MLRRconstants";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scale-boundries',
  templateUrl: './scale-boundries.component.html',
  styleUrls: ['./scale-boundries.component.css']
})
export class ScaleBoundriesComponent implements OnInit {

  scaleBoundryFormGroup: FormGroup = new FormGroup({});
  scaleBoundries: ScaleBoundry[] = [];
  maxScale: number;
  lowBoundry: number;
  highBoundry: number;

  constructor(
    private ScaleBoundryDataStorage: ScaleBoundryDataStorage,
    private scaleBoundriesService: ScaleBoundriesService,
    private toastr: ToastrService) { }
    

  ngOnInit(): void {
    this.scaleBoundryFormGroup = this.scaleBoundriesService.initScaleBoundryFormGroup('', '', '');    
    this.ScaleBoundryDataStorage.getScaleBoundries().subscribe((scaleBoundries: ScaleBoundry[]) => {
      const maxScale = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(scaleBoundries, 'MaxScale');
      const lowBoundry = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(scaleBoundries, 'LowBoundry');
      const highBoundry = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(scaleBoundries, 'HighBoundry');
      this.scaleBoundries = scaleBoundries;
      this.maxScale = maxScale?.valueConfiguration!;
      this.lowBoundry = lowBoundry?.valueConfiguration!;
      this.highBoundry = highBoundry?.valueConfiguration!;
      this.scaleBoundryFormGroup = this.scaleBoundriesService.initScaleBoundryFormGroup(this.maxScale, this.lowBoundry, this.highBoundry);
    });
  }

  onSubmit() {

    // Reading value input from form
    let maxScaleInput = this.scaleBoundryFormGroup.get('maxScaleControl')?.value;
    let lowBoundryInput = this.scaleBoundryFormGroup.get('lowBoundryControl')?.value;
    let highBoundryInput = this.scaleBoundryFormGroup.get('highBoundryControl')?.value;
    // this.setRatingScaleInLocalStorage();

    if (this.scaleBoundryFormGroup.valid) {

      // This is the first time to save new scale boundry
      if (this.scaleBoundries === undefined || this.scaleBoundries.length == 0) {            
        this.scaleBoundriesService.newScaleBoundries(this.scaleBoundries, maxScaleInput, lowBoundryInput, highBoundryInput);
        this.ScaleBoundryDataStorage.saveNewScaleBoundry(this.scaleBoundries);
        this.toastr.success("Added New Scale Boundry Succesfully", "Scale Boundry");

      } else {
        const maxScale = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(this.scaleBoundries, 'MaxScale');
        const lowBoundry = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(this.scaleBoundries, 'LowBoundry');
        const highBoundry = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(this.scaleBoundries, 'HighBoundry');
        maxScale.valueConfiguration = maxScaleInput;
        lowBoundry.valueConfiguration = lowBoundryInput;
        highBoundry.valueConfiguration = highBoundryInput;
        this.scaleBoundries = this.scaleBoundriesService.updateScaleBoundries(this.scaleBoundries, maxScale, lowBoundry, highBoundry);
        console.log('submitted valid')
        this.ScaleBoundryDataStorage.saveNewScaleBoundry(this.scaleBoundries);
        this.toastr.success("Updated Scale Boundry Successfully", "Scale Boundry");
        this.scaleBoundryFormGroup = this.scaleBoundriesService.initScaleBoundryFormGroup(maxScaleInput, lowBoundryInput, highBoundryInput);
        this.ScaleBoundryDataStorage.setDefaultScale(+maxScaleInput,+lowBoundryInput,+highBoundryInput)
      }
    } else
        this.toastr.error("Sorry Error in Scale Boundry", "Scale Boundry");
  }



}
