import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../general/firebase.service';
import { delay, tap ,take,map,first, switchMap} from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authFirebaseService: FirebaseService
  ) {}


  // canActivate() {
  //   this.authFirebaseService.getUser().pipe(
  //     take(1),
  //     switchMap(async (authState) => {
  //         if (authState) {
  //             return true;
  //         } else {
  //             console.log('No autenticado');
  //             this.router.navigate(['/auth/login'])
  //             return false
  //         }
  //     }),)}
      
      
    //   res => {
    //   if(!res){
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    //   return true;
    // });

  //   return this.auth.authState.pipe(
  //     take(1),
  //     switchMap(async (authState) => {
  //         if (authState) {
  //             return true;
  //         } else {
  //             console.log('No autenticado');
  //             this.router.navigate(['/auth/login'])
  //             return false
  //         }
  //     }),
  // )
  // }

  canActivate(){
    return this.authFirebaseService.getUser().pipe(
      take(1),
      switchMap(async (authState) => {
          if (authState) {
              return true;
          } else {
              console.log('No autenticado');
              this.router.navigate(['/login'])
              return false
          }
      }),
  )

}
  
}
