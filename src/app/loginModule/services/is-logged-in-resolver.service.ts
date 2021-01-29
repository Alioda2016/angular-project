import {Injectable} from '@angular/core';
import {AuthService} from "./auth-service.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInResolverService {
  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  resolve(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([''])
    }
  }
}
