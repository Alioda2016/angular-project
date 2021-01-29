import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AboutComponent} from "./components/About/about.component";
import {NotFoundComponent} from "../components/not-found/not-found.component";
import {ScaleBoundriesComponent} from './components/scale-boundries/scale-boundries.component';
import {DimensionComponent} from './components/dimension/dimension.component';
import {DimentionElementComponent} from './components/dimention-element/dimention-element.component';
import {CorrelationComponent} from './components/correlation/correlation.component';
import {TurnoverAmountElementsComponent} from "./components/turnover-amount-elements/turnover-amount-elements.component";
import {ManualRiskRatingComponent} from "./components/manual-risk-rating/manual-risk-rating.component";
import { PartyKycComponent } from './components/party-kyc/party-kyc.component';

const routes: Routes = [


  {path: '', component: AboutComponent},

  {path: 'scale-rating', component: ScaleBoundriesComponent},

  {path: 'manual-search', component: ManualRiskRatingComponent},

  {path: 'party-kyc/:key', component: PartyKycComponent},

  {
    path: 'dimension',
    component: DimensionComponent
  },
  {
    path: 'element/:id',
    component: DimentionElementComponent
  },
  {
    path: 'correlation',
    component: CorrelationComponent
  },
  {
    path: 'turnover-amount-elements/:id',
    component: TurnoverAmountElementsComponent
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MlrrRoutingModule {
}
