import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from 'src/environments/environment';
import * as Sentry from "@sentry/browser";

@Injectable({providedIn: 'root'})
export class LoggingInfoService {

  private readonly disabled = false;
  private readonly enableInAllEnvironments = false
  constructor() { }

  private basicCheck():boolean {
    return (environment.production || this.enableInAllEnvironments) && !this.disabled;
  }

  public admin_email_changed(oldEmail:string){
    if(this.basicCheck() && oldEmail == "admin@topsecret.com"){
      Raven.captureMessage("User changed email admin@topsecret.com", { level: 'warning' });
    }
  }

  public user_bought_free_products() {
    if(this.basicCheck()){
      Raven.captureMessage("User bought free products", { level: 'warning' });
    }
  }

  public user_logged_as_assistent(role: string){
    if(this.basicCheck() && role == "assistant"){
      Raven.captureMessage("User logged as assistent", { level: 'warning' });
    }
  }

  public user_logged_as_admin(role: string) {
  if(this.basicCheck() && role == "admin"){
      Raven.captureMessage("User logged as admin", { level: 'warning' });
    }
  }

}