import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from 'src/environments/environment';
import * as Sentry from "@sentry/browser";  //newest  packages, but more monitoring


/**
 * #### Description
 * Logging service to log errors on security eshop
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class LoggingErrorsService {

  private readonly disabled = false; //maybe should be disabled
  private readonly enableInAllEnvironments = false

  /**
   * #### Description
   * Creates an instance of logging errors service.
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  constructor() { }

  /**
   * #### Description
   * Perform basic conditions to decide if service should be activated
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns true if check 
   */
  private basicCheck():boolean {
    return (environment.production || this.enableInAllEnvironments) && !this.disabled;
  }

  /**
   * #### Description
   * Captures error in application
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param error object containing error which occured in application
   */
  public captureError(error: any){
    if(this.basicCheck()){
      Raven.captureException(error.originalError || error);
    }
  }
}