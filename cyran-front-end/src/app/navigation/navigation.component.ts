import { StorageService } from './../StorageService';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  numberOfProductsInCart;
  constructor(private _auth: AuthService, private _localStorage: StorageService, private _snackBar:MatSnackBar) {}

  ngOnInit(): void {
  }

  public isLogged(): boolean {
    return localStorage.getItem("loggedIn") !== null;
  }

  public isShopAssistant(): boolean {
    var role = localStorage.getItem("role");
    return role !== null && (role == "assistant" || role == "admin" );
  }

  public isAdmin(): boolean {
    var role = localStorage.getItem("role");
    return role !== null && role == "admin";
  }

  public logout(): void {
    SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "You has been successfully logged out!");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
  }

  public toManageBoard(): void { 
  }

  public toAdminBoard(): void {
  }
}
