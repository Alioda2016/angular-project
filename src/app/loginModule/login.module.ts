import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {LoginRoutingModule} from './login-routing.module';
import {SharedModule} from "../sharedModule/shared.module";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  exports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
