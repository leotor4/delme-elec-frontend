import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router:Router, private tokenStorageService : TokenStorageService ) {

    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean|UrlTree {

        var isLoggedIn = !!this.tokenStorageService.getToken()
        if (!isLoggedIn) {
            alert('You are not allowed to view this page. You are redirected to login Page');

            return false;
        }

        return true;
    }

}
