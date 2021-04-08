import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingErrorsService } from '../services/logging-errors.service';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';
import { ErrorMessageComponent } from '../info-snackbars/error-message/error-message.component';

@Component({
  selector: 'app-resend-password',
  templateUrl: './resend-password.component.html',
  styleUrls: ['./resend-password.component.css']
})
export class ResendPasswordComponent implements OnInit {

  constructor(private _ourHttpClient:HttpClient, private _snackBar:MatSnackBar, 
    private router:Router, private _loggingErrorsService: LoggingErrorsService) { }
  
  form: FormGroup;
  email: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {}

  public searchAccordingName(email:string, purePassword: string, hashedPassword: string): void {
    var dictionary = {}
    dictionary['email'] = email;
    dictionary['purePassword'] = purePassword;
    dictionary['hashedPassword'] = hashedPassword;

    this._ourHttpClient.post("http://localhost:8080/changePasswd", dictionary, { responseType: 'text' as 'json' }).subscribe(
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

  resendPassword(form: string){
    var purePassword: string = CryptoJS.lib.WordArray.random(20).toString();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword:string = bcrypt.hashSync(purePassword, salt);

    this.searchAccordingName(form['email'], purePassword, hashedPassword)
  }
}
