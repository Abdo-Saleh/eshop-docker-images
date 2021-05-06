import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';
import { ErrorMessageComponent } from '../info-snackbars/error-message/error-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingErrorsService } from './logging-errors.service';
import { environment } from 'src/environments/environment';

/**
 * #### Description
 * Manages products in security eshop
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  productCreationUrl: string;
  productObtainUrl: string;

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
   * Creates an instance of product management service.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _ourHttpClient for working with HTTP requests
   * @param _snackBar for responsive feedback for users
   * @param _loggingErrorsService logs errors - tracks errors while using application
   */
  constructor(private _ourHttpClient: HttpClient, private _snackBar: MatSnackBar, private _loggingErrorsService: LoggingErrorsService) { }

  /**
   * #### Description
   * Sends product to backend for insertion
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param name product name 
   * @param description product description
   * @param price product price
   * @param url priduct download url, if exists
   * @param quantity product quantity which is available
   */
  public insert(name:string, description:string, price:number, url:string, quantity:number): void {
    if(environment.localDeploy){
      this.productCreationUrl = "product/insert";
    } else {
      this.productCreationUrl = "create/product";
    }

    var dictionary = {}
    dictionary['name'] = name;
    dictionary['description'] = description;
    dictionary['price'] = price;
    dictionary['URL'] = url;
    dictionary['quantity'] = quantity;

    this._ourHttpClient.post(this.baseUrl + this.productCreationUrl, dictionary, { responseType: 'text' as 'json' }).subscribe(
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

  /**
   * #### Description
   * Get first six products from backend to load them on main page
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param baseComponent component which call this function with set method
   * @returns first six products objects 
   */
  public getFirstSixProducts(baseComponent: any): any {
    if(environment.localDeploy){
      this.productObtainUrl = "/firstProducts?count=6";
    } else {
      this.productObtainUrl = "products";
    }

    return this._ourHttpClient.get(this.baseUrl + this.productObtainUrl).subscribe(
      (response)=>{
        baseComponent.setProducts(response)
      },
      (error)=>{
        this._loggingErrorsService.captureError(error);
        console.error(error);
      });
  }
}

