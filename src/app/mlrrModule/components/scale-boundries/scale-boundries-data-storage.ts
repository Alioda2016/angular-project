import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MLRRconstants } from 'src/app/MLRRconstants';
import { environment } from 'src/environments/environment';
import { ScaleBoundry } from '../../models/scale.boundry.model';
import { ScaleBoundriesService } from '../../services/scale-boundries.service';


@Injectable({ providedIn: 'root' })
export class ScaleBoundryDataStorage {

    private scaleBoundryUrl: string = `${environment.projectUrl}/mllr/configurations/scaleBoundry`;

    constructor(
        private http: HttpClient,
        private scaleBoundriesService: ScaleBoundriesService) {
    }


    public getScaleBoundries() : Observable<ScaleBoundry[]>{
         return this.http.get<ScaleBoundry[]>(this.scaleBoundryUrl);
    }


    public saveNewScaleBoundry(newScaleBoundry: ScaleBoundry[]) {
        return this.http.post<ScaleBoundry[]>(this.scaleBoundryUrl, newScaleBoundry).subscribe();
    }
    setDefaultScale(maxScaleControl:number=10,lowBoundryControl:number=3,highBoundryControl:number=7) {
        let defaultRatingScale = {
          'maxScaleControl': maxScaleControl,
          'lowBoundryControl': lowBoundryControl,
          'highBoundryControl': highBoundryControl
        }
        localStorage.setItem(MLRRconstants.RatingScale, JSON.stringify(defaultRatingScale))
      }

}