import { Component, OnInit } from '@angular/core';
import { PartyDim } from '../../models/partyDim.model';
import { ActivatedRoute, Router } from "@angular/router";
import { PartydimService } from "../../services/partydim.service";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-party-kyc',
  templateUrl: './party-kyc.component.html',
  styleUrls: ['./party-kyc.component.css']
})
export class PartyKycComponent implements OnInit {
  party: PartyDim = new PartyDim();

  constructor(private route: ActivatedRoute, private router: Router, private partyService: PartydimService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(data => data["key"]),
      switchMap(key => this.partyService.getPartyByPartyKey(key)

      )).subscribe(data => {
        if (data) {
          this.party = data
        } else {
          this.router.navigate([''])
        }
      })

  }

}
