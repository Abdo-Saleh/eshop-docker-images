import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {

  private get baseUrl() {
    const baseUrl = environment.apiBaseUrl || 'http://localhost:8080';
    return `${baseUrl}/`;
  }
  
  constructor(private _ourHttpClient: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  createOrder(order:any){
    return this._ourHttpClient.post(this.baseUrl + "create/order", order).subscribe(
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
