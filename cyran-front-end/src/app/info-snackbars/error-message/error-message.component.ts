import { Component, Inject} from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {

  private static readonly duration = 3000;
  errorMessage: string = "Failed!";
  errorAction: string = null;
  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.errorMessage = (data.errorMessage)? data.errorMessage : "Failed";
    this.errorAction = (data.errorAction)? data.errorAction : null;
  }


  static openSnackBarErrorAction(_snackBar: MatSnackBar, message: string, action: string) {
    _snackBar.open(message, action, {
      duration: ErrorMessageComponent.duration,
    });
  }

  static openSnackBarError(_snackBar: MatSnackBar, message: string) {
    _snackBar.openFromComponent(ErrorMessageComponent,  {
      data: {
        errorMessage: message
      },
      duration: ErrorMessageComponent.duration,
    });
  }
}
