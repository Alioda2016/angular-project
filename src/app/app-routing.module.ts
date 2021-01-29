import {WelcomeComponent} from './components/welcome/welcome.component';
import {MLRRconstants} from './MLRRconstants';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from "./loginModule/services/auth-guard.service";
import {IsLoggedInResolverService} from "./loginModule/services/is-logged-in-resolver.service";

const routes: Routes = [
  {
    path: MLRRconstants.login,resolve: [IsLoggedInResolverService],
    loadChildren: () => import('./loginModule/login.module')
      .then(m => m.LoginModule)
      .catch(error => {
        console.log(error)
      }),
  },
  {
    path: '',
    component: WelcomeComponent, canActivate: [AuthGuardService],
    children: [

      {
        path: '', loadChildren: () => import('./mlrrModule/mlrr.module')
          .then(m => m.MlrrModule).catch(error => {
            console.log(error)
          })
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
