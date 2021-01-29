import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MlrrRoutingModule} from "./mlrr-routing.module";
import {AboutComponent} from './components/About/about.component';
import {DimentionElementComponent} from './components/dimention-element/dimention-element.component';
import {DimensionComponent} from './components/dimension/dimension.component';
import {AddNewDimensionComponent} from './components/add-new-dimension/add-new-dimension.component';
import {AddNewElementComponent} from './components/add-new-element/add-new-element.component';
import {CorrelationComponent} from './components/correlation/correlation.component';
import {AlertDialogComponent} from '../components/alert-dialog/alert-dialog.component';
import {SharedModule} from "../sharedModule/shared.module";
import {ScaleBoundriesComponent} from './components/scale-boundries/scale-boundries.component';
import {ManualRiskRatingComponent} from './components/manual-risk-rating/manual-risk-rating.component';
import {AddNewTurnoverAmountElementComponent} from "./components/add-new-turnover-amount-element/add-new-turnover-amount-element.component";
import {TurnoverAmountElementsComponent} from "./components/turnover-amount-elements/turnover-amount-elements.component";
import {SelectRatingScaleComponent} from "./components/select-rating-scale/select-rating-scale.component";
import { AddNewCorrelationComponent } from './components/add-new-correlation/add-new-correlation.component';
import { PartyKycComponent } from './components/party-kyc/party-kyc.component';
import { DisplayRiskRatingDialogComponent } from './components/manual-risk-rating/display-risk-rating-dialog/display-risk-rating-dialog.component';


@NgModule({
  declarations: [AboutComponent, DimentionElementComponent, DimensionComponent,
    CorrelationComponent, AddNewDimensionComponent, AddNewElementComponent, AlertDialogComponent,
    ScaleBoundriesComponent,
    SelectRatingScaleComponent,
    TurnoverAmountElementsComponent,
    AddNewTurnoverAmountElementComponent,
    AboutComponent,
    ManualRiskRatingComponent,AddNewDimensionComponent, AddNewElementComponent, AlertDialogComponent, AddNewCorrelationComponent, PartyKycComponent, DisplayRiskRatingDialogComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MlrrRoutingModule,
    SharedModule
  ],
  exports: [
    MlrrRoutingModule,
    SharedModule
  ]
})
export class MlrrModule {
}
