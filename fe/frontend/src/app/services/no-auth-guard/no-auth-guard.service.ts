import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from '../be/backend.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService {


  constructor(private backendService: BackendService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.backendService.isAuthenticated()) {
      this.router.navigate(['home'])
      return false;
    }
    return true;
  }
}
