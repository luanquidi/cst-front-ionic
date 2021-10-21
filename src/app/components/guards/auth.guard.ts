import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private token = '75c450c3f963befb912ee79f0b63e563652780f0';

  constructor(private router: Router) {}


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    let token = sessionStorage.getItem('token');
    if(!token) { 
      this.router.navigate(['/login']);
      return false 
    };
    if (token.toUpperCase() != this.token.toUpperCase()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
