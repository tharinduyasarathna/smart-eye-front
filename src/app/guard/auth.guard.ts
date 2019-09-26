import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authservice: AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.authservice.isLoggedIn()){
         
         console.log("true");
         return true
       } else  {        
         // Hands the user to the LogIn page 
         
         this.router.navigate( ["login"] );
         alert("You are currently not logged in, please provide Login!")
         return false
 
       }
  }
}
