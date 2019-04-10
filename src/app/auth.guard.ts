import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {


    constructor(private authService : AuthService, private router:Router)
    {
        
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state:RouterStateSnapshot):boolean{
            if (localStorage.getItem('accessToken')!= null )
            {
                let roles = route.data["roles"] as Array<String>;
                console.log(roles);
                if (roles){
                    var match = this.roleMatch(roles);
                    if (match) return true;
                    else {
                        this.router.navigate(['/404'])
                        return false;
                    }
                }
            else return true;
            
            }
            localStorage.clear();
            this.router.navigate(['/login']);
            return false;
        }

        canActicvateChild(
            route: ActivatedRouteSnapshot,
            state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree > | boolean|UrlTree
            {
                return true;
            }

        roleMatch(allowedRoles):boolean{
            console.log(allowedRoles);
            var isMatch = false;
            var userRoles : string = localStorage.getItem('role');
            console.log(userRoles);
            allowedRoles.forEach(element => {
                if (userRoles.indexOf(element)> -1 )
                {
                    isMatch = true;
                    return false;
                }
                
            });
            return isMatch;
        }    
}