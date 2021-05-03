import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoggingInfoService } from '../services/logging-info.service';
import { UserManagementService } from '../services/user-management.service';
import { ProductManagementService } from '../services/product-management.service';

/**
 * #### Description
 * Interface for user management with basic information as id, name and role
 * 
 * #### Version
 * since: V1.0.0
 *
 */
export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', email: "e@e.com"},
  {id: 2, name: 'Helium', email: "kkklll@kkklll.com"},
];

/**
 * #### Description
 * Component for management of users in eshop - only admin and shop assistant should have access into it
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-manage-board',
  templateUrl: './manage-board.component.html',
  styleUrls: ['./manage-board.component.css']
})
export class ManageBoardComponent implements OnInit {

  form: FormGroup;
  emailGroup: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'email', 'change-username', 'change-email'];
  dataSource = ELEMENT_DATA;
  name:string;
  description:string;
  price:number;
  url:string;
  quantity:number;

  phrase: string;
  lastPhrase: string;
  last: string;
  option: string = 'name';
  elements: any;

  i:number;
  newName: string;
  newEmail: string;

  /**
   * #### Description
   * Creates an instance of manage board component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _userManagementService service for managing users
   * @param _productManagementService service for managing products - mainly insertion of new products
   * @param _snackBar for responsive feedback for users
   * @param _loggingInfoService logs informative messages - tracks user certain actions - login as shop assistent
   */
  constructor(private _userManagementService: UserManagementService, private _productManagementService: ProductManagementService, private _snackBar: MatSnackBar,
    private _loggingInfoService :LoggingInfoService) { }

  /**
   * #### Description
   * Initializes form validation for manage board
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
    this.searchAccordingEmail("ja", true);

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.emailGroup = new FormGroup({
      emailControl: new FormControl('',[Validators.required])
    });
  }

  /**
   * #### Description
   * Tests if search according email and name works
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  test(){
    this.searchAccordingName("a");
    this.searchAccordingEmail("a");
  }

  /**
   * #### Description
   * Sets elements - records for redraw template if something changes
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param elements new elements which should overwrite previous version 
   */
  public setElements(elements: any){
    this.elements = elements;
  }

  /**
   * #### Description
   * Changes an email - delegates changes of email of user to user management service
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param formul not used, only experimentating
   * @param oldEmail old email (before change) of user
   * @param id id of element in template which should be changed
   */
  public changeEmail(formul, oldEmail:string, id:number): void {
    console.log(formul['email-' + id.toString()]);
    this._userManagementService.changeEmail(this, oldEmail, id);
  }

  /**
   * #### Description
   * Changes user name - delegates changes of user name of user to user management service
   * #### Version
   * since: V1.0.0
   * 
   * @param oldName user name before request for change
   * @param id id of element in template which should be changed
   */
  public changeName(oldName:string, id:number): void {
    this._userManagementService.changeName(this, oldName, id);
  }

  /**
   * #### Description
   * General search method. Searches according phrase from chosen option (name or email)
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param phrase phrase which should be used for search
   * @param option option target type of search - for example name - search according name
   */
  public search(phrase:string, option:string){
    if(option == "name"){
      this.searchAccordingName(phrase, false);
    } else if(option == "email"){
      this.searchAccordingEmail(phrase, false);
    } else {
      console.log("Unknown option!")
    }
  }

  /**
   * #### Description
   * Repeat previous search again - useful after change of data
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  public doLastSearch(){
    if(this.last=="email"){
      this.searchAccordingEmail(this.lastPhrase, true);
    } else {
      this.searchAccordingName(this.lastPhrase, true);
    }
  }

  /**
   * #### Description
   * Searches according email
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param email email of user
   * @param [reload] if true search will be repeated with login name again otherwise not
   */
  public searchAccordingEmail(email:string, reload:boolean = false): void {
    this.last = email;
    this.lastPhrase = email;
    this._userManagementService.searchAccordingEmail(this, email, reload);
  }

  /**
   * #### Description
   * Searches according name
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param name login name of user
   * @param [reload] if true search will be repeated with login name again otherwise not
   */
  public searchAccordingName(name:string, reload:boolean = false): void {
    this.last = "name";
    this.lastPhrase = name;
    this._userManagementService.searchAccordingName(this, name, reload);
  } 

  /**
   * #### Description
   * Checks validity of form and then inserts product to database
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  submit() {
    if (this.form.status != "INVALID") {
      this._productManagementService.insert(this.name, this.description, this.price, 'none', this.quantity);
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
