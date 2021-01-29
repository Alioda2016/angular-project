import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FlatCorrelatedListElement } from '../mlrrModule/models/FlatCorrelatedListElement.model';
import { Correlation } from '../models/Correlation';
import { DimensionElementDto } from '../models/DimensionElementDto';

@Injectable({
  providedIn: 'root'
})
export class CorrelationService {
  addNewCorrelation(correlatedElementsNames: DimensionElementDto[]) {
    let url = `${environment.projectUrl}/addNewCorrelation`
    let correlation:Correlation={elements:correlatedElementsNames,id:0,name:'',rate:0}
   return this.http.post(url,correlation)
  }



  constructor(private http: HttpClient) { }

  // addCorrelation(correlatedElement: string) {
  //   var correlation = new Correlation();
  //   correlation.elementName = correlatedElement;
  //   this.elements.push(correlation);
  // }
  findAllCorrelatedLists(){
    let url = `${environment.projectUrl}/getAllCorrelatedListElements`
    return this.http.get<FlatCorrelatedListElement[]>(url)
  }
  addNewCorrelatedList(correlatedElement: string){
    let url = `${environment.projectUrl}/correlatedList`
    return this.http.post(url, correlatedElement)
  }

  findCorrelatedListById(id: number){
    let url = `${environment.projectUrl}/correlatedList/${id}`
    return this.http.get(url)
  }

  deleteCorrelatedListById(id: number){
    let url = `${environment.projectUrl}/correlatedList/${id}`
    return this.http.delete(url)
  }

  editCorrelatedListRate(id: number, rate: number){
    let url =`${environment.projectUrl}/correlatedList/${id}/update/rate/${rate}`
    return this.http.put(url, {})
  }
}
