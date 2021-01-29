import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {MLRRconstants} from 'src/app/MLRRconstants';
import {credentials, UserResponse} from 'src/app/models/credentials';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: string = this.getUserName()

  constructor(private http: HttpClient, private router: Router, private toaster: ToastrService) {
  }

  get currentUser() {
    const token = this.getToken()
    if (!token) {
      return null;
    }
    const decodedToken = new JwtHelperService().decodeToken(token);
    return decodedToken.userName || '';
  }

  getUserName(): string {
    return localStorage.getItem(MLRRconstants.userName) || '';
  }

  closeSession(id: any) {
    let url = `${environment.projectUrl}/closeSession/${id}`
    return this.http.delete(url);
  }

  login(credentials: credentials) {
    return this.http.post<UserResponse>(environment.projectUrl + '/mlrr/auth',
      JSON.stringify(credentials), httpOptions);
  }

  logout() {
    this.userName = '';
    if (environment.mockLogin) {
      this.logoutMock()
    } else {
      this.logoutApi().subscribe(() => {
        this.toaster.success('logout successfully')
        this.clearLocalHostAndNavigateLogin()
      }, error => {
      })
    }
  }

  isLoggedIn() {
    const token = this.getToken()
    if (environment.mockLogin && token) {
      return true
    } else {

      const helper = new JwtHelperService();
      if (!token) {
        return false;
      }
      return !helper.isTokenExpired(token);
    }
  }

  has_Capabilities(capability: string): boolean {
    const authorities = this.getUserAuthorities();
    if (authorities) {
      return authorities.includes(capability);
    } else {
      return false;
    }
  }

  public getUserAuthorities() {

    const token = this.getToken()
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const authorities: string[] = decodedToken.authorities;
    return authorities;
  }

  getToken() {
    return localStorage.getItem(MLRRconstants.token) || undefined;
  }


  getCapabilities(): any[] {

    const token = this.getToken()
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const authorities: any[] = decodedToken.authorities;
    return authorities;

  }

  logoutApi() {
    const url = `${environment.projectUrl}/aml/logout`;
    return this.http.get(url);
  }

  clearLocalHostAndNavigateLogin() {


    localStorage.clear()
    this.router.navigate([MLRRconstants.login])
  }

  findLoggedUsersByTokenId() {
    let url = `${environment.projectUrl}/loggedUsers`
    return this.http.get(url)
  }

  getTokenId() {
    const token = this.getToken()
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const tokenId: number = decodedToken.tokenID;
    return tokenId
  }

  private logoutMock() {
    this.toaster.success('logout successfully Mock')
    this.clearLocalHostAndNavigateLogin()
  }
}


