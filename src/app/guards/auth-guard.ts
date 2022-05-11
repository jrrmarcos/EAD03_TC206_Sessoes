import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { toast } from 'bulma-toast'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const user = sessionStorage.getItem('user')

    if (user != "null") {
      return true
    } else {
      toast({ message: 'Realize o login!', type: 'is-danger' })
      this.router.navigate(['/login'])
      console.log(user)
      return false
    } 
  }
}

