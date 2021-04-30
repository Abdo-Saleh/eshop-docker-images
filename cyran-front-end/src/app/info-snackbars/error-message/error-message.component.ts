import { Component, Inject} from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

/**
 * #### Description
 * Component for displaying error messages
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {

  private static readonly duration = 3000;
  errorMessage: string = "Failed!";
  errorAction: string = null;
  
  /**
   * #### Description
   * Creates an instance of error message component and prepares error message content 
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param data data which contains errorMessage information to display - will be injected after it is used in constructor
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.errorMessage = (data.errorMessage)? data.errorMessage : "Failed";
    this.errorAction = (data.errorAction)? data.errorAction : null;
  }

  /**
   * #### Description
   * Displays snackbar error message with action
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _snackBar  for responsive feedback for users
   * @param message error message that should be displayed
   * @param action action for snackbar
   */
  static openSnackBarErrorAction(_snackBar: MatSnackBar, message: string, action: string) {
    _snackBar.open(message, action, {
      duration: ErrorMessageComponent.duration,
    });
  }

  /**
   * #### Description
   * Displays snackbar error message
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _snackBar for responsive feedback for users
   * @param message error message that should be displayed
   */
  static openSnackBarError(_snackBar: MatSnackBar, message: string) {
    _snackBar.openFromComponent(ErrorMessageComponent,  {
      data: {
        errorMessage: message
      },
      duration: ErrorMessageComponent.duration,
    });
  }
}
