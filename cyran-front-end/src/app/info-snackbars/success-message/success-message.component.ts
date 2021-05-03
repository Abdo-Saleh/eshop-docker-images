import {Component, Inject} from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';


/**
 * #### Description
 * Component for displaying success messages
 * 
 * #### Version
 * since: V1.0.0
 *
 */
@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent {
  private static readonly duration = 3000;
  successMessage: string = "Success!";
  successAction: string = null;
  
  /**
   * #### Description
   * Creates an instance of success message component and prepares success message content
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param data data which contains successMessage information to display - will be injected after it is be used in constructor
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.successMessage = (data.successMessage)? data.successMessage : "Success";
    this.successAction = (data.successAction)? data.successAction : null;
  }

  /**
   * #### Description
   * Displays snackbar success message with action
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _snackBar for responsive feedback for users
   * @param message success message that should be displayed
   * @param action action for snackbar
   */
  static openSnackBarSuccessAction(_snackBar: MatSnackBar, message: string, action: string) {
    _snackBar.open(message, action, {
      duration: SuccessMessageComponent.duration,
    });
  }

  /**
   * #### Description
   * Displays snackbar success message with action
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _snackBar for responsive feedback for users
   * @param message success message that should be displayed
   */
  static openSnackBarSuccess(_snackBar: MatSnackBar, message: string) {
    _snackBar.openFromComponent(SuccessMessageComponent,  {
      data: {
        successMessage: message
      },
      duration: SuccessMessageComponent.duration,
    });
  }
}
