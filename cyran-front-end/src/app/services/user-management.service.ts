import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingErrorsService } from './logging-errors.service';
import { LoggingInfoService } from './logging-info.service';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';
import { ErrorMessageComponent } from '../info-snackbars/error-message/error-message.component';
import { environment } from 'src/environments/environment';

/**
 * #### Description
 * Manages users and their personal information in security eshop
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

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
   * Creates an instance of user management service.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _ourHttpClient for working with HTTP requests
   * @param _snackBar for responsive feedback for users
   * @param _loggingInfoService logs informative messages - tracks users i certain actions
   * @param _loggingErrorsService logs errors - tracks errors while using application
   */
  constructor(private _ourHttpClient: HttpClient, private _snackBar: MatSnackBar, 
    private _loggingInfoService :LoggingInfoService, private _loggingErrorsService: LoggingErrorsService) { }

  /**
   * #### Description
   * Searchs for users according user name
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param base_component component which calls this method (this) which implements setElements method
   * @param name user name which should be basis for search
   * @param [reload] 
   */
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

  /**
   * #### Description
   * Changes email of given user to new one
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param base_component component which calls this method (this) which implements setElements method and doLastSearch method
   * @param oldEmail old email of given user
   * @param id id of row in template - id in template is "email-" + id.toString()
   */
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

  /**
   * #### Description
   * Changes login name of given user to new one
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param base_component component which calls this method (this) which implements setElements method and doLastSearch method
   * @param oldName old login name of given user
   * @param id id of row in template - id in template is "name-" + id.toString()
   */
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

  /**
   * #### Description
   * Searchs for users according user email
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param base_component component which calls this method (this) which implements setElements method
   * @param email user email which should be basis for search
   * @param [reload] 
   */
  public searchAccordingEmail(base_component: any, email:string, reload:boolean = false): void {
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

  /**
   * #### Description
   * Sets role for user according his name. Role management is enabled only with admin priviledges.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param role new role which colud be set
   * @param name user name
   */
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

  /**
   * #### Description
   * Gets role for user according his name. Role management is enabled only with admin priviledges.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param name user name to obtain his role
   * @returns role - user role
   */
  public getRole(name:string):any {
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
