import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';

/**
 * #### Description
 * Representation of destination place - city. 
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
interface DeliveryCity {
  value: string;
  viewValue: string;
}

/**
 * #### Description
 * Representation of delivery companies. Their name and list of possible cities - destinations.
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
interface DeliveryCompanies {
  disabled?: boolean;
  name: string;
  city: DeliveryCity[];
}

/**
 * #### Description
 * Component for managing delivery information
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent implements OnInit {

  form: FormGroup

  /**
   * #### Description
   * Creates an instance of delivery info component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _ourHttpClient for working with HTTP requests
   * @param _snackBar for responsive feedback for users
   * @param router to navigate and redirrects
   */
  constructor(private _ourHttpClient: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  /**
   * #### Description
   * Preparation of all form controls for data validation on frontend
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      surname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      post: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      postalcode: new FormControl('', [Validators.required]),
    });
  }

  name: string;
  surname: string;
  address: string;
  city: string;
  post: string;
  street: string;
  postalcode: string;
  deliveryplace: string;

  color: ThemePalette = 'accent';
  checked = true;

  deliveryControl = new FormControl();
  deliveryGroups: DeliveryCompanies[] = [
    {
      name: 'DHL',
      city: [
        { value: 'trnava56', viewValue: 'Trnava 56' },
        { value: 'kralovany512', viewValue: 'Kralovany 512' },
        { value: 'liptMikulas12', viewValue: 'Liptovsky Mikulas 12' }
      ]
    },
    {
      name: 'Geis',
      city: [
        { value: 'nitra58', viewValue: 'Nitra 58' },
        { value: 'pezinok78', viewValue: 'Pezinok 78' },
        { value: 'gabcikovo69', viewValue: 'Gabcikovo 69' },
        { value: 'liptMikulas74', viewValue: 'Liptovsky Mikulas 74' }
      ]
    },
    {
      name: 'REMAX',
      disabled: true,
      city: [
        { value: 'pezinok123', viewValue: 'Pezinok 123' },
        { value: 'bratislava27', viewValue: 'Bratislava 27' },
        { value: 'kosice13', viewValue: 'Kosice 13' }
      ]
    }
  ];

  /**
   * #### Description
   * Prepares all delivery info data and save them to local storage
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param deliveryInfo information about delivery
   */
  public setDelivery(deliveryInfo: any): void {

    var deliveryData = {}

    deliveryData['name'] = deliveryInfo['name'];
    deliveryData['surname'] = deliveryInfo['surname'];
    deliveryData['address'] = deliveryInfo['address'];
    deliveryData['street'] = deliveryInfo['street'];

    deliveryData['city'] = deliveryInfo['city'];
    deliveryData['post'] = deliveryInfo['post'];
    deliveryData['postalcode'] = deliveryInfo['postalcode'];

    localStorage.setItem("deliveryInfo", JSON.stringify(deliveryData));

    if (this.name && this.surname && this.address)
      this.router.navigateByUrl('/paying-methods');

  }

  /**
   * #### Description
   * On form submit delivery information will be checked and after it stored into local storage
   * If some date will not be filled or correct, error should be thrown
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  submit() {
    if (this.form.status != "INVALID") {
      this.setDelivery({'name':name, 'surname': this.surname, 'address': this.address, 'street': this.street, 
        'city': this.city, 'post': this.post, 'postalcode': this.postalcode, 
        'deliveryissueplace': this.checked, 'deliveryplace': this.deliveryplace});
      SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Delivery information set!");  
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
