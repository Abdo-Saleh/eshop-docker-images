import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
import { LoginService } from '../services/login.service';

/**
 * #### Description
 * Component which manages template for resending recreated password
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-resend-password',
  templateUrl: './resend-password.component.html',
  styleUrls: ['./resend-password.component.css']
})
export class ResendPasswordComponent implements OnInit {

  /**
   * #### Description
   * Creates an instance of resend password component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _loginService service for managing login services
   */
  constructor(private _loginService: LoginService) { }
  
  form: FormGroup;
  email: string;

  /**
   * #### Description
   * Initializes form validation
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  /**
   * #### Description
   * On submit form - does nothing
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  submit(): void {}

  /**
   * #### Description
   * Resends passwords - delegates send request for password resend on login service
   * Prepares hash (generates) using bcrypt which will be stored on backend
   * Opened password is included too - to inform user in mail 
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param form form field containing user email
   */
  resendPassword(form: string){
    var purePassword: string = CryptoJS.lib.WordArray.random(20).toString();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword:string = bcrypt.hashSync(purePassword, salt);

    this._loginService.requestPassword(form['email'], purePassword, hashedPassword)
  }
}
