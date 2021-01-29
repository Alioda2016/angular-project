import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';

import {Subscription} from 'rxjs';
import {MLRRconstants} from 'src/app/MLRRconstants';
import {AuthService} from '../../services/auth-service.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {credentials} from "../../../models/credentials";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptionLogin: Subscription;
  loginControl: FormGroup;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public toastr: ToastrService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginControl = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  signIn() {
    let credentials = this.loginControl.value
    if (environment.mockLogin) {
      this.signInMock()
    } else {

      this.signInReal(credentials);

    }
  }

  signInReal(credentials: credentials) {
    this.subscriptionLogin = this.authService.login(credentials).subscribe(data => {
        this.toastr.success('Logged in Successfully');
        if (data && data.hasOwnProperty('token')) {
          localStorage.setItem(MLRRconstants.token, data.token);
          const myRawToken = data.token;
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(myRawToken);
          localStorage.setItem(MLRRconstants.userName, decodedToken.userName);
          localStorage.setItem(MLRRconstants.tokenID, decodedToken.tokenID);
          const returnUrl = this.route.snapshot.queryParamMap.get(MLRRconstants.returnUrl);
          this.router.navigate([returnUrl || '']);

        }
      }
    );

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


  rootUrl() {
    const returnUrl = this.route.snapshot.queryParamMap.get(MLRRconstants.returnUrl);
    this.router.navigate([returnUrl || '/']);
  }

  ngOnDestroy() {
    if (this.subscriptionLogin != undefined) {
      this.subscriptionLogin.unsubscribe();
    }
  }


  private signInMock() {
    this.toastr.success('Logged in Successfully Mock');
    localStorage.setItem(MLRRconstants.token, "testToken");
    localStorage.setItem(MLRRconstants.userName, "userNameTest");
    localStorage.setItem(MLRRconstants.tokenID, "tokenIDTest");
    const returnUrl = this.route.snapshot.queryParamMap.get(MLRRconstants.returnUrl);
    this.router.navigate([returnUrl || '']);


  }
}


