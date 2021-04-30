
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';

/**
 * #### Description
 * Manages navigation bar in application
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  numberOfProductsInCart;

  /**
   * #### Description
   * Creates an instance of navigation component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _auth 
   * @param _snackBar for responsive feedback for users
   */
  constructor(private _auth: AuthService, private _snackBar:MatSnackBar) {}

  /**
   * #### Description
   * On init - does nothing
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
  }

  /**
   * #### Description
   * Checks if user is logged
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns true if logged 
   */
  public isLogged(): boolean {
    return localStorage.getItem("loggedIn") !== null;
  }

  /**
   * #### Description
   * Checks if user have permissions as shop assistant or higher (admin)
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns true if shop assistant or admin otherwise false
   */
  public isShopAssistant(): boolean {
    var role = localStorage.getItem("role");
    return role !== null && (role == "assistant" || role == "admin" );
  }

  /**
   * #### Description
   * Checks if user have permissions as admin
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns true if admin 
   */
  public isAdmin(): boolean {
    var role = localStorage.getItem("role");
    return role !== null && role == "admin";
  }

  /**
   * #### Description
   * Logout from application
   * Removes authentification items stored in local storage
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  public logout(): void {
    SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "You has been successfully logged out!");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
  }
}
