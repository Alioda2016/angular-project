import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TurnoverAmountElementModel } from '../models/TurnoverAmountElement.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoveramountService {

  constructor(private http:HttpClient) { }
  findAllTurnoverAmountElements(type:string){
    let url=`${environment.projectUrl}/turnoverElements/type/${type}`
    return this.http.get<TurnoverAmountElementModel[]>(url)
  }
  findTurnoverElementByDimensionId(id:number){
    let url=`${environment.projectUrl}/turnoverElements/${id}`
    return this.http.get<TurnoverAmountElementModel[]>(url)
  }

  addNewTurnoverAmountElement(element: TurnoverAmountElementModel){
    let url = `${environment.projectUrl}/dimension/add/turnoverElement`
    return this.http.put(url, element)
  }

  deleteTurnoverElementsById(id :number){
    let url = `${environment.projectUrl}/turnoverElement/${id}`
    return this.http.delete(url)
  }

  updateTurnoverElement(element: TurnoverAmountElementModel){
    let url = `${environment.projectUrl}/turnoverElement/rate/update`
    return this.http.put(url, element)
  }
}
