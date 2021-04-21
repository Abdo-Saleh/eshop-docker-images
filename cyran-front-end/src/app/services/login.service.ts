import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { ErrorMessageComponent } from '../info-snackbars/error-message/error-message.component';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';
import { AuthService } from './auth/auth-service';
import { LoggingErrorsService } from './logging-errors.service';
import { LoggingInfoService } from './logging-info.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private get baseUrl() {
    const baseUrl = environment.apiBaseUrl || 'http://localhost:8080';
    return `${baseUrl}/`;
  }
  
  constructor(private _ourHttpClient:HttpClient, private router: Router, private _snackBar: MatSnackBar,
    private _auth: AuthService, private _loggingInfoService :LoggingInfoService, private _loggingErrorsService: LoggingErrorsService) { }

  public getUserOld(user:any):any {

    return this._ourHttpClient.get(this.baseUrl + "getUser?name=" + user.name).subscribe(
      (response)=>{
        const salt = bcrypt.genSaltSync(10);

        if( bcrypt.compareSync(user.password,response['password'], function(err, res) {
          if (err){

            this._auth.getUserDetails(user.name, user.password);
            return false;
          }
          if (res) {

            localStorage.setItem("loggedIn",user.name);
            this._auth.setLoggedIn(true, user.name);
            return true;
          }

          return false;
        }) == true){
          this._auth.setLoggedIn(true, user.name);
          
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl('/signin');
          ErrorMessageComponent.openSnackBarError(this._snackBar, "Wrong login or password!");
        };
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured during login! Please try it later");
        console.error(error);
        this._loggingErrorsService.captureError(error);
      })
}

public getUser(user:any):any {

    return this._ourHttpClient.get(this.baseUrl + "login?name=" + user.name).subscribe(
      (response)=>{
        
        const salt = bcrypt.genSaltSync(10);
        if( bcrypt.compareSync(user.password,response['password'], function(err, res) {
          if (err){
            this._auth.getUserDetails(user.name, user.password);
            return false;
          }
          if (res) {

            localStorage.setItem("loggedIn",user.name);
            this._auth.setLoggedIn(true, user.name);
            return true;
          }

          return false;
        }) == true){
          this._auth.setLoggedIn(true, user.name);
          SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Successfully logged in!");
          this._auth.setRole(true, response['priviledges']);
          this._loggingInfoService.user_logged_as_admin(response['priviledges']);
          this._loggingInfoService.user_logged_as_assistent(response['priviledges']);

          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl('/signin');
          ErrorMessageComponent.openSnackBarError(this._snackBar, "Wrong login or password!");
        };
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured during login! Maybe unknown user! Please try it later");
        console.error(error);
        this._loggingErrorsService.captureError(error);
      })
}


public setPriviledges(name:string): void {
  var dictionary = {}
  dictionary['name'] = name

  this._ourHttpClient.post(this.baseUrl + "priviledges", dictionary, { responseType: 'text' as 'json' }).subscribe(
    (response)=>{
      localStorage.setItem('priviledge',response['priviledge']);
      return dictionary;
    },
    (error)=>{
      console.error(error);
      this._loggingErrorsService.captureError(error);
      return dictionary;
    });
}

public setUserOld(user:any):any {

  const salt = bcrypt.genSaltSync(10);
  const passBCrypt1 = bcrypt.hashSync(user.password, salt);
  var newUser = {}
  newUser['name'] = user.name;
  newUser['password'] = passBCrypt1;
  //users/register/name/{username}/password/{password}
  return this._ourHttpClient.post(this.baseUrl + "register", newUser ).subscribe(
    (response) => {
      if( response!= null){
        SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "You are registered!");
        this.router.navigateByUrl('/signin');
      } else {
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured during registration! Try it again later!");
        this.router.navigateByUrl('/signup');
      }
    },
    (error)=>{
      ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured during registration! Try it again later!");
      console.error(error);
      this._loggingErrorsService.captureError(error);
    })
}

public setUser(user:any):any {

  const salt = bcrypt.genSaltSync(10);
  const passBCrypt1 = bcrypt.hashSync(user.password, salt);
  var newUser = {}
  newUser['name'] = user.name;
  newUser['email'] = user.email;
  newUser['password'] = passBCrypt1;

  //users/register/name/{username}/password/{password}
  return this._ourHttpClient.post(this.baseUrl + "signup", newUser, { responseType: 'text' as 'json' }).subscribe(
    (response)=>{
      if( response!= null){
        SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "You are registered!");
        this.router.navigateByUrl('/signin');
      } else {
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured during registration! Try it again later!");
        this.router.navigateByUrl('/signup');
      }
    },
    (error)=>{
      ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured during registration! Try it again later!");
      console.error(error);
      this._loggingErrorsService.captureError(error);
    })
}

public searchAccordingName(email:string, purePassword: string, hashedPassword: string): void {
  var dictionary = {}
  dictionary['email'] = email;
  dictionary['purePassword'] = purePassword;
  dictionary['hashedPassword'] = hashedPassword;

  this._ourHttpClient.post(this.baseUrl + "changePasswd", dictionary, { responseType: 'text' as 'json' }).subscribe(
    (response)=>{
      if(response == "true"){
        SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Password has been successfully sent to email!");
        this.router.navigateByUrl('/signin');
      } else{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Email address not exists! Use correct email address!");
      }
      return;
    },
    (error)=>{
      ErrorMessageComponent.openSnackBarError(this._snackBar, "Error while changing password! Use correct email address or try it again later!");
      console.error(error);
      this._loggingErrorsService.captureError(error);
      return;
    });

}

public logError(error){
  console.error("Occured error: "+error);
    return Observable.throw(error || "Internal server error - undefined error!");
}

}
