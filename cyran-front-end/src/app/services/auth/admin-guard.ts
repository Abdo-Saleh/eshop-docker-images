import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.auth.getIsAdmin()) {
            this.router.navigate(['/'])
            return false;
        }

        return this.auth.getIsAdmin();
    }

    setLoggedIn(value: boolean, name: string) {
        this.auth.setLoggedIn(value, name);
    }

}