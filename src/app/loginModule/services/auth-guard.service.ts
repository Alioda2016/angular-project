import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth-service.service";
import {Injectable} from "@angular/core";
import {MLRRconstants} from 'src/app/MLRRconstants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([MLRRconstants.login], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
