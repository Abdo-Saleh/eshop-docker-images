import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from 'src/environments/environment';
import * as Sentry from "@sentry/browser";

/**
 * #### Description
 * Logging service to log user actions on security eshop
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Injectable({providedIn: 'root'})
export class LoggingInfoService {

  private readonly disabled = false;
  private readonly enableInAllEnvironments = false

  /**
   * #### Description
   * Creates an instance of logging info service.
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
   * Logs information that user changed admins email
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param oldEmail old user email which will be changed
   */
  public admin_email_changed(oldEmail:string){
    if(this.basicCheck() && oldEmail == "admin@topsecret.com"){
      Raven.captureMessage("User changed email admin@topsecret.com", { level: 'warning' });
    }
  }

  /**
   * #### Description
   * Logs information that users bought free products
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  public user_bought_free_products() {
    if(this.basicCheck()){
      Raven.captureMessage("User bought free products", { level: 'warning' });
    }
  }

  /**
   * #### Description
   * Logs information that users logged as assistent
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param role role of user in security eshop
   */
  public user_logged_as_assistent(role: string){
    if(this.basicCheck() && role == "assistant"){
      Raven.captureMessage("User logged as assistent", { level: 'warning' });
    }
  }

  /**
   * #### Description
   * Logs information that users logged as admin
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param role role of user in security eshop
   */
  public user_logged_as_admin(role: string) {
  if(this.basicCheck() && role == "admin"){
      Raven.captureMessage("User logged as admin", { level: 'warning' });
    }
  }

}