import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| Observable<boolean> | Promise<boolean> => {
  const router = inject(Router)
  const authService = inject(AuthService);
  const isAuth = authService.getIsAuth();
  if (!isAuth) {
    router.navigate(['/login']);
  }
  return isAuth;
};
