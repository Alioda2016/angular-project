import {Injectable} from '@angular/core';
import {Dimension} from '../models/Dimension';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { DimensionElementDto } from '../models/DimensionElementDto';


@Injectable({
  providedIn: 'root'
})
export class DimensionService {


  dimensions: Dimension[] = [
    {
      id: 0,
      name: "Ocupation",
      description: "fhjkhfkjscnkjn",
      weight: 23,
      enabled: true,
      sourceColumn: 'pep_ind',
      elements: [],
      organization: true,
      individual: false
    },
    {
      id: 1,
      name: "Prouduct",
      description: "fhjkhfkjscnkjn",
      weight: 23,
      enabled: false,
      sourceColumn: 'pep_ind',
      elements: [],
      organization: true,
      individual: false
    },
    {
      id: 2,
      name: "Nationality",
      description: "fhjkhfkjscnkjn",
      weight: 23,
      enabled: true,
      sourceColumn: 'pep_ind',
      elements: [],
      organization: true,
      individual: false
    },
    {
      id: 3,
      name: "PEP Indicator",
      description: "fhjkhfkjscnkjn",
      weight: 23,
      enabled: false,
      sourceColumn: 'pep_ind',
      elements: [],
      organization: true,
      individual: false
    },
    {
      id: 4,
      name: "Turnover Amount",
      description: "fhjkhfkjscnkjn",
      weight: 23,
      enabled: false,
      sourceColumn: 'pep_ind',
      elements: [],
      organization: true,
      individual: false
    },
    {
      id: 5,
      name: "Mailing City",
      description: "fhjkhfkjscnkjn",
      weight: 23,
      enabled: true,
      sourceColumn: 'pep_ind',
      elements: [],
      organization: true,
      individual: false
    },
    {
      id: 6,
      name: "Street Country",
      description: "fhjkhfkjscnkjn",
      weight: 23,
      enabled: true,
      sourceColumn: 'pep_ind',
      elements: [],
      organization: true,
      individual: false
    },
    {
      id: 7,
      name: "Industry",
      description: "fhjkhfkjscnkjn",
      weight: 23,
      enabled: true,
      sourceColumn: 'pep_ind',
      elements: [],
      organization: true,
      individual: false
    }
  ];


  constructor(private http: HttpClient) {
  }


  public getAllDimensions() {


    let url = environment.projectUrl + '/dimensions';
    return this.http.get(url);
  }



  deleteDimension(id: number) {
    let url=`${environment.projectUrl}/dimension/${id}`
    return this.http.delete(url)
  }
  saveDimension(dimension:Dimension) {
    let url=`${environment.projectUrl}/dimension/`
    console.log("add: ", dimension);
    return this.http.post(url,dimension)
  }

  updateDimension(dimension:Dimension) {
    let url=`${environment.projectUrl}/dimension/`
    console.log("update: ", dimension);
    return this.http.put(url,dimension)
    
  }

  enableDimension(id:number){
    let url=`${environment.projectUrl}/dimension/${id}/enableDimension`
    return this.http.put(url,{})
  }
  disableDimension(id:number){
    let url=`${environment.projectUrl}/dimension/${id}/disableDimension`
    return this.http.put(url,{})
  }

  getDimensionElements(id: number){
    let url = `${environment.projectUrl}/dimension/${id}/elements`
    return this.http.get(url)
  }

  addElementToDimension(dimensionElementDto: DimensionElementDto){
    let url = `${environment.projectUrl}/dimension/add/element`
    return this.http.put<DimensionElementDto>(url, dimensionElementDto)
  }

  updateElementRate(dimensionElementDto: DimensionElementDto){
    let url =`${environment.projectUrl}/Dimension_X_Elements/rate/update`
    return this.http.put(url, dimensionElementDto)
  }

  deleteElementfromDimension(elementId: number, dimensionId: number){
    let url = `${environment.projectUrl}/Dimension_X_Element/${elementId}/${dimensionId}`
    return this.http.delete(url)
  }
  getAllDimensionElements(){
    let url = `${environment.projectUrl}/dimensions/element/group`
    return this.http.get<DimensionElementDto[]>(url)
  }

  updateDimensionType(id: number, individual: boolean, organization: boolean){
    let url = `${environment.projectUrl}/dimension/${id}/type/${individual}/${organization}`
    return this.http.put(url, {})
  }

}
