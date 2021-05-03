import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService} from '../services/login.service';

/**
 * #### Description
 * Login component for managing login template
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  /**
   * #### Description
   * Creates an instance of login component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _snackBar for responsive feedback for users
   * @param _loginService service for managing login services
   */
  constructor(private _snackBar: MatSnackBar, private _loginService: LoginService) { }
  customer: any;
  name:string;
  password: string;

  /**
   * #### Description
   * Initializes objects for form validation
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /**
   * #### Description
   * Loads user using login service from backend
   * User information will be loaded to local storage
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param user user object containing basic information of user 
   */
  public getUser(user:any):void {
    this._loginService.getUser(user);
  }

  /**
   * #### Description
   * Checks if form is valid and then emits form value
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
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
