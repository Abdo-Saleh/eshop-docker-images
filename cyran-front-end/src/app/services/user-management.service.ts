import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingErrorsService } from './logging-errors.service';
import { LoggingInfoService } from './logging-info.service';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';
import { ErrorMessageComponent } from '../info-snackbars/error-message/error-message.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private get baseUrl() {
    const baseUrl = environment.apiBaseUrl || 'http://localhost:8080';
    return `${baseUrl}/`;
  }
  
  constructor(private _ourHttpClient: HttpClient, private _snackBar: MatSnackBar, 
    private _loggingInfoService :LoggingInfoService, private _loggingErrorsService: LoggingErrorsService) { }

  public searchAccordingName(base_component: any, name:string, reload:boolean = false): void {
    var dictionary = {}
    dictionary['name'] = name;
  
    this._ourHttpClient.post(this.baseUrl + "name", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        if(!reload){
          SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Search results according name prepared!");
        }
        base_component.setElements(JSON.parse(response.toString()));
        return dictionary;
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured while obtaining search results according email! Try it again later!");
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });

  }

  public changeEmail(base_component: any, oldEmail:string, id:number): void {
      var dictionary = {}
      var newEmail = (document.getElementById("email-" + id.toString())as HTMLInputElement).value;
      dictionary['oldEmail'] = oldEmail;
      dictionary['newEmail'] = newEmail;
      this._loggingInfoService.admin_email_changed(oldEmail);
            
      this._ourHttpClient.post(this.baseUrl + "changeEmail", dictionary, { responseType: 'text' as 'json' }).subscribe(
        (response)=>{
          SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Email successfuly changed to: " + newEmail + "!");
          base_component.setElements(JSON.parse(response.toString()));
          base_component.doLastSearch();
          return dictionary;
        },
        (error)=>{
          console.error(error);
          this._loggingErrorsService.captureError(error);
          return dictionary;
        });

    }

  public changeName(base_component: any, oldName:string, id:number): void {
      var dictionary = {}
      var newName = (document.getElementById("name-" + id.toString()) as HTMLInputElement).value;
      dictionary['oldName'] = oldName;
      dictionary['newName'] = newName;

      this._ourHttpClient.post(this.baseUrl + "changeName", dictionary, { responseType: 'text' as 'json' }).subscribe(
        (response)=>{
          SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Name successfully changed to " + newName + "!");
          base_component.setElements(JSON.parse(response.toString()));
          base_component.doLastSearch();
          return dictionary;
        },
        (error)=>{
          console.error(error);
          this._loggingErrorsService.captureError(error);
          return dictionary;
        });

    }

  public searchAccordingEmail(base_component: any,email:string, reload:boolean = false): void {
    console.log(email);

    var dictionary = {}
    dictionary['email'] = email;

    this._ourHttpClient.post(this.baseUrl + "email", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        if(!reload){
          SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Search results according email prepared!");
        }
        base_component.setElements(JSON.parse(response.toString()));
        return dictionary;
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured while obtaining search results according email! Try it again later!");
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });
  }

  public setRole(role:string, name:string):void {
    var dictionary = {}
    dictionary['name'] = name;
    dictionary['role'] = role;
    dictionary['password'] = "";

    this._ourHttpClient.post(this.baseUrl +  "setRole", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Role " + role + " has been successfully set!");
        return dictionary;
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured while setting role " + role + "! Try it again later!");
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });

  }

  public getRole(name:string):void {
    var dictionary = {}
    dictionary['name'] = name;
    dictionary['password'] = "";

    this._ourHttpClient.post(this.baseUrl +  "getRole", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Role " + name + " has been successfully loaded!");
        return response;
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured while getting role " + name + "! Try it again later!");
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });

  }
}
