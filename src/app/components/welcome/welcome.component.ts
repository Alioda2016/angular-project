import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../loginModule/services/auth-service.service';
import {MLRRconstants} from 'src/app/MLRRconstants';
import {ConfirmationAlertComponent} from "../../sharedModule/components/confirmation-alert/confirmation-alert.component";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userName: string = ''
  isOn = false;
  over = 'over';
  displayName = localStorage.getItem(MLRRconstants.userName);
  index = 0

  constructor(public auth: AuthService,
              private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userName = localStorage.getItem(MLRRconstants.userName) || ' '

  }

  logout() {

    let dialogRef = this.dialog.open(ConfirmationAlertComponent, {
      width: '100vw', panelClass: 'custom-dialog-container', data: {message: 'Logout'}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result.logout)
          this.auth.logout()
        this.clearLocalStorage();
      }
    );
  }

  changeIsOn() {
    this.isOn = !this.isOn
  }

  goToAbout() {
    this.router.navigate([''])
  }


  goToScaleBoundry() {
    this.router.navigate(['scale-rating']);
  }


  goToDimension() {
    this.router.navigate(['dimension'])
  }

  goToManualRisRating() {
    this.router.navigate(['manual-search']);
  }

  goToCorrelation(){
    this.router.navigate(['correlation'])
  }

  goToPartyKyc() {
    this.router.navigate(['party-kyc'])
  }

  private clearLocalStorage() {

    localStorage.clear();
  }

  goToTurnoverAmountElements(type:string) {
    let id=type==MLRRconstants.Individual?environment.individualTurnoveramountId:environment.organizationTurnoveramountId
    this.router.navigate(['turnover-amount-elements',id])
  }
}
