import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';


/**
 * #### Description
 * Register component for managing registration template 
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  errorMessage = "invalid ";
  form: FormGroup;
  errorb;

  /**
   * #### Description
   * Creates an instance of register component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _loginService service for managing login services
   * @param _snackBar for responsive feedback for users
   */
  constructor(private _loginService: LoginService, private _snackBar: MatSnackBar) { }

  name:string;
  password: string;
  email: string;
  address: string;

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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  /**
   * #### Description
   * Creates user - delegates to send request to backend on login service
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param user object containing basic information of user 
   */
  setUser(user:any) {
    this._loginService.setUser(user);
  }

  /**
   * #### Description
   * Verifies if form is valid and if so emits event with form value
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
