import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Element} from "../models/Element";
import { NONE_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

   elements: Element[] = [
    { id: -1, name:'', rate: 8 , elementName: "none", dimension_id:2},
    { id: 0, name:'', rate: 8 ,elementName:"Yemen", dimension_id: 2},
    { id: 1, name:'', rate: 8 , elementName:"Eygpt", dimension_id: 2},
    { id: 2, name:'', rate: 8 , elementName:"Qatar", dimension_id: 2},
    { id: 3, name:'', rate: 8 , elementName:"Saudia", dimension_id: 2}, 
    { id: 4, name:'', rate: 8 , elementName:"UAE", dimension_id: 2}, { id: 5, name:'', rate: 8 , elementName:"Iraq", dimension_id: 2},
    { id: 6, name:'', rate: 8 , elementName:"Tunesia", dimension_id: 2} ,{ id: 7, name:'', rate: 8 , elementName:"Sudan", dimension_id: 2}
  ];  
  constructor(private http: HttpClient) { }

  public getAllElements(id: number) {
    let url = '';
//    return this.http.get(url)
  }
  
  public deleteElement(id: number) {
    let url = `link/${id}`;
    return this.http.delete(url);
    // return null;
  }

  public satusDecision(firstNumber: number, secondNumber: number, thirdNumber: number) {

  }
}
