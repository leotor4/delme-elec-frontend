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

            return false;
        }

        return true;
    }

}
