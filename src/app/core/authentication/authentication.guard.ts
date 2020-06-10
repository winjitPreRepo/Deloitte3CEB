import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from './credentials.service';
import { HttpGenericSerivce } from '../../shared/http-genric.service';
import { UserConcurrentLogin } from '../../shared/models/ApplicationUser';
import { first } from 'rxjs/operators';
import * as consts from '../../shared/globle.constants';
@Injectable({
  providedIn: 'root'
})
export class PartnerGuard implements CanActivate {

  constructor(private router: Router,
    private credentialsService: CredentialsService,private httpGenericSerivce: HttpGenericSerivce) { }
  credentials: any = {};
  logout: UserConcurrentLogin = {};
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      this.credentials = this.credentialsService.credentials
      if (this.credentials) {
        return true;
      }
    } else {
      this.logout.userId = this.credentials.userId;
      // this.httpGenericSerivce.postData(consts.logout, this.logout).pipe(first()).subscribe(lst => {
      // });
      // //log.debug('Not authenticated, redirecting and adding redirect url...');
      this.router.navigate(['/signIn']);
      return false;
    }
   
  }
}
