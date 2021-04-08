import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth/auth-service';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';
import { LoggingInfoService } from '../services/logging-info.service';
import { LoggingErrorsService } from '../services/logging-errors.service';
import { ErrorMessageComponent } from '../info-snackbars/error-message/error-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(private _ourHttpClient:HttpClient, private _snackBar: MatSnackBar, private router: Router,
     private _auth: AuthService, private _loggingInfoService :LoggingInfoService, private _loggingErrorsService: LoggingErrorsService) { }
  customer: any;
  name:string;
  password: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public getUserOld(user:any):any {

      return this._ourHttpClient.get("http://localhost:8080/getUser?name=" + user.name).subscribe(
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

      return this._ourHttpClient.get("http://localhost:8080/login?name=" + user.name).subscribe(
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

    this._ourHttpClient.post("http://localhost:8080/priviledges", dictionary, { responseType: 'text' as 'json' }).subscribe(
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

  public logError(error){
    console.error("Occured error: "+error);
      return Observable.throw(error || "Internal server error - undefined error!");
  }

  submit() {
    if (this.form.status != "INVALID") {
      this.submitEM.emit(this.form.value);
    }
    else {
      let snackBarRef = this._snackBar.open('Please fill up all required fields', '', {
        duration: 1000
      });
    }
  }

  @Output() submitEM = new EventEmitter();
}
