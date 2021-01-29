import { Component, OnInit } from '@angular/core';
import { MLRRconstants } from "./MLRRconstants";
import { ScaleBoundryDataStorage } from './mlrrModule/components/scale-boundries/scale-boundries-data-storage';
import { ScaleBoundry } from './mlrrModule/models/scale.boundry.model';
import { ScaleBoundriesService } from './mlrrModule/services/scale-boundries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dg-mlrrModule-ui';
  constructor(private ScaleBoundryDataStorage: ScaleBoundryDataStorage,
    private scaleBoundriesService: ScaleBoundriesService) {

  }
  ngOnInit(): void {
    this.getScalingRate()

  }

 
 
  getScalingRate() {
    this.ScaleBoundryDataStorage.getScaleBoundries().subscribe((scaleBoundries: ScaleBoundry[]) => {
      const maxScale = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(scaleBoundries, 'MaxScale');
      const lowBoundry = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(scaleBoundries, 'LowBoundry');
      const highBoundry = this.scaleBoundriesService.findScaleBoundryBykeyConfiguration(scaleBoundries, 'HighBoundry');
      let maxScaleValue = maxScale?.valueConfiguration!;
      let lowBoundryValue = lowBoundry?.valueConfiguration!;
      let highBoundryValue = highBoundry?.valueConfiguration!;
this.ScaleBoundryDataStorage.setDefaultScale(maxScaleValue,lowBoundryValue,highBoundryValue)

    })
  }
}
