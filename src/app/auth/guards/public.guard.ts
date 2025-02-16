import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, of, pipe, tap,  } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkAuthStatus = (): Observable<boolean> => {
  //se incluye el autService y el router

  const authService : AuthService = inject(AuthService);
  const router:Router=inject(Router);

  const authResult = authService.checkAuthentication();
  const authObservable = authResult instanceof Observable ? authResult: of(authResult);


  return  authObservable.pipe(
    tap( isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['./']);
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  );
};

export const canActivatePublicGuard: CanActivateFn = (
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot,
) => {

  console.log('CanActive');
  console.log({route,state});
    
  return checkAuthStatus();
};

export const canMatchPublicGuard: CanMatchFn = (
  route:Route,
  segments:UrlSegment[]
) => {

  console.log('CanMatch');
  console.log({route,segments});
    
  return checkAuthStatus();
};
