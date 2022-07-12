import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})


export class RoleGuardService implements CanActivate {

    constructor(private router:Router, private tokenStorageService : TokenStorageService ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
        return this.isAllowed(route.routeConfig?.path)
    }


    private isAllowed(route : string | undefined) {
        if (!route) {
            return false
        }
        
        var user = this.tokenStorageService.getUser()    
    
        if ("createProp" === route && user['role_id'] == 2) {
          return true;
        } 
        
        return false
      }
      

  public isResponsibleOrManager (responsible_email : string): boolean {
    var user = this.tokenStorageService.getUser()
    
    if (user['email'] == responsible_email || user['role_id'] == 3) {
      return true;
    } 

    return false;
  }


  public isFiscalOrManager (): boolean {
    var user = this.tokenStorageService.getUser()
    
    if (user['role_id'] == 2 || user['role_id'] == 3) {
      return true;
    } 

    return false;
  }


  public isManager (): boolean {
    var user = this.tokenStorageService.getUser()
    
    if (user['role_id'] == 3) {
      return true;
    } 

    return false;
  }

}
