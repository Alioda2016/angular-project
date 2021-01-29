import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PartyDim} from "../models/partyDim.model";

@Injectable({
  providedIn: 'root'
})
export class PartydimService {

  constructor(private http:HttpClient) { }
  getPartyByPartyKey(partyKey:number){
    let url=`${environment.projectUrl}/party_byKey/${partyKey}`
    return this.http.get<PartyDim>(url)

  }

}
