
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {SharedModule} from "./sharedModule/shared.module";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoaderInterceptor} from "./sharedModule/services/loader.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}],
  bootstrap: [AppComponent],

})
export class AppModule {
}
