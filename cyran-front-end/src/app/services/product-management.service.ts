import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';
import { ErrorMessageComponent } from '../info-snackbars/error-message/error-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingErrorsService } from './logging-errors.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  private get baseUrl() {
    const baseUrl = environment.apiBaseUrl || 'http://localhost:8080';
    return `${baseUrl}/`;
  }
  
  constructor(private _ourHttpClient: HttpClient, private _snackBar: MatSnackBar, private _loggingErrorsService: LoggingErrorsService) { }

  public insert(name:string, description:string, price:number, url:string, quantity:number): void {
    var dictionary = {}
    dictionary['name'] = name;
    dictionary['description'] = description;
    dictionary['price'] = price;
    dictionary['URL'] = url;
    dictionary['quantity'] = quantity;

    this._ourHttpClient.post(this.baseUrl + "create/product", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Product successfully created!");
        return dictionary;
      },
      (error)=>{
        console.error(error);
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error during creation occured! Please check connection and try it later!");
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });
  }

  public getFirstSixProducts(): any {
    return this._ourHttpClient.get(this.baseUrl + "products").subscribe(
      (response)=>{
      },
      (error)=>{
        this._loggingErrorsService.captureError(error);
        console.error(error);
      });
  }
}

