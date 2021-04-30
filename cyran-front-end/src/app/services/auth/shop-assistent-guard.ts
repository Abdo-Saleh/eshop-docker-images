import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

/**
 * #### Description
 * Guard to check shop assistant role
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Injectable()
export class ShopAssistentGuard implements CanActivate {

    /**
     * #### Description
     * Creates an instance of shop assistent guard.
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param auth  service which provide authentification mechanism 
     * @param router to navigate and redirrects
     */
    constructor(private auth: AuthService, private router: Router) { }

    /**
     * #### Description
     * Determines whether can activate for assistant
     * 
     * #### Version
     * since: V1.0.0
     * 
     * @param next route where assistant or higher ranked role is requered
     * @param state snapshot of route state
     * @returns activate condition - true means that assistant can activate otherwise false
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.auth.getIsAssistant()) {
            this.router.navigate(['/'])
            return false;
        }

        return this.auth.getIsAssistant();
    }

    /**
     * #### Description
     * Sets logged in state for shop assistant
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