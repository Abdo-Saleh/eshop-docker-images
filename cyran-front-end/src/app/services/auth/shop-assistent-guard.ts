import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable()
export class ShopAssistentGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.auth.getIsAssistant()) {
            this.router.navigate(['/'])
            return false;
        }

        return this.auth.getIsAssistant();
    }

    setLoggedIn(value: boolean, name: string) {
        this.auth.setLoggedIn(value, name);
    }
}