import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultRiskRating } from '../../models/result.risk.rating.model';
import {manualRatingCase} from "../../models/manualRating.model";

@Injectable({ providedIn: 'root' })
export class SearchCriteriaDataStorage {


    constructor(
        private http: HttpClient) {
    }

    getAllSearchCriteria(searchCriteria: ResultRiskRating, pageNumber: number, pageSize: number) {
        let url=`${environment.projectUrl}/search-criteria/${pageNumber}/${pageSize}`
        return this.http.post(url, searchCriteria)
    }


    getAllParties(pageNumber: number , pageSize: number) {
        let url=`${environment.projectUrl}/search-criteria-all/${pageNumber}/${pageSize}`
        return this.http.get(url)

    }
    createManualRatingCase(manualRatingCase: manualRatingCase){
      let url=`${environment.projectUrl}/partydim/createManualRatingCase`
      return this.http.post(url,manualRatingCase);
    }
}
