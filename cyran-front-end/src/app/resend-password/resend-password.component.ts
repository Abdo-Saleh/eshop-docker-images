import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-resend-password',
  templateUrl: './resend-password.component.html',
  styleUrls: ['./resend-password.component.css']
})
export class ResendPasswordComponent implements OnInit {

  constructor(private _loginService: LoginService) { }
  
  form: FormGroup;
  email: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {}

  resendPassword(form: string){
    var purePassword: string = CryptoJS.lib.WordArray.random(20).toString();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword:string = bcrypt.hashSync(purePassword, salt);

    this._loginService.requestPassword(form['email'], purePassword, hashedPassword)
  }
}
