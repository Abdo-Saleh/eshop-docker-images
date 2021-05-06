import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';

/**
 * #### Description
 * Management of orders is provided here
 * 
 * #### Version
 * since: V1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  
  orderCreationUrl:string;

  /**
   * #### Description
   * Get base url. Method for portability. It loads variable with backend location url from environment.
   *  
   * #### Version
   * since: V1.0.0
   */
  private get baseUrl() {
    const baseUrl = environment.apiBaseUrl || 'http://localhost:8080';
    return `${baseUrl}/`;
  }

  /**
   * #### Description
   * Imjects client for working with HTTP , snack bar for diplaying messages and router for routing
   * 
   * #### Version
   * since: V1.0.0

   * @param _ourHttpClient for working with HTTP requests
   * @param _snackBar for responsive feedback for users
   * @param router to navigate and redirrects
   */
  constructor(private _ourHttpClient: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  
  /**
   * #### Description
   * Creates order. After creation of order user is redirrected to main page or to bought products if order is payed.
   * 
   * #### Version
   * since: V1.0.0

   * @param order object containing information about order
   * @returns  created order subscription
   */
  createOrder(order:any){
    if(environment.localDeploy){
      this.orderCreationUrl = "eorder/insert";
    } else {
      this.orderCreationUrl = "create/order";
    }
    return this._ourHttpClient.post(this.baseUrl + this.orderCreationUrl , order).subscribe(
      (response) => {
        if (response != null) {
          if(response['order']['payed']){
            localStorage.removeItem("shoppingCartProducts");
            localStorage.setItem("boughtProducts", JSON.stringify(response['order']['products']));
            SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Bought order with downloadable products prepared!");
            this.router.navigateByUrl('/completed');
          } else {
            localStorage.removeItem("shoppingCartProducts");
            SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Order info will be send to your email address!");
            this.router.navigateByUrl('/');
          }
        } else {
        }
      },
      (error) => {

        if (error.error.text != "error") {
          this.router.navigateByUrl('/completed');
        } else {
         this._snackBar.open('Not successfull', '', {
            duration: 1000
          });
        }
      })
  }
}
