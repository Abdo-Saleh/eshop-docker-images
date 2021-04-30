import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

/**
 * #### Description
 * Guard to check shop admin role
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Injectable()
export class AdminGuard implements CanActivate {

    /**
     * #### Description
     * Creates an instance of admin guard.
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param auth service which provide authentification mechanism 
     * @param router to navigate and redirrects
     */
    constructor(private auth: AuthService, private router: Router) { }

    /**
     * #### Description
     * Determines whether can activate for admin
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param next route where admin is requered
     * @param state snapshot of route state
     * @returns activate condition - true means that admin can activate otherwise false
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.auth.getIsAdmin()) {
            this.router.navigate(['/'])
            return false;
        }

        return this.auth.getIsAdmin();
    }

    /**
     * #### Description
     * Sets logged in state for admin
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param value logged in boolean value
     * @param name name of user
     */
    setLoggedIn(value: boolean, name: string) {
        this.auth.setLoggedIn(value, name);
    }
}