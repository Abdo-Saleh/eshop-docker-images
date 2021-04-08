import {Component, Inject} from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

/**
 * @title Basic snack-bar
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
  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.successMessage = (data.successMessage)? data.successMessage : "Success";
    this.successAction = (data.successAction)? data.successAction : null;
  }


  static openSnackBarSuccessAction(_snackBar: MatSnackBar, message: string, action: string) {
    _snackBar.open(message, action, {
      duration: SuccessMessageComponent.duration,
    });
  }

  static openSnackBarSuccess(_snackBar: MatSnackBar, message: string) {
    _snackBar.openFromComponent(SuccessMessageComponent,  {
      data: {
        successMessage: message
      },
      duration: SuccessMessageComponent.duration,
    });
  }
}
