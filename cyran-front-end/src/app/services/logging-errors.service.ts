import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from 'src/environments/environment';
import * as Sentry from "@sentry/browser";  //newest  packages, but more monitoring
import { RangeValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoggingErrorsService {

  private readonly disabled = false; //maybe should be disabled
  private readonly enableInAllEnvironments = false
  constructor() { }

  private basicCheck():boolean {
    return (environment.production || this.enableInAllEnvironments) && !this.disabled;
  }

  public captureError(error: any){
    if(this.basicCheck()){
      Raven.captureException(error.originalError || error);
    }
  }
}