import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoggingInfoService } from '../services/logging-info.service';
import { UserManagementService } from '../services/user-management.service';
import { ProductManagementService } from '../services/product-management.service';

export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', email: "e@e.com"},
  {id: 2, name: 'Helium', email: "kkklll@kkklll.com"},
];

@Component({
  selector: 'app-manage-board',
  templateUrl: './manage-board.component.html',
  styleUrls: ['./manage-board.component.css']
})
export class ManageBoardComponent implements OnInit {

  form: FormGroup;
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

  constructor(private _userManagementService: UserManagementService, private _productManagementService: ProductManagementService, private _snackBar: MatSnackBar,
    private _loggingInfoService :LoggingInfoService) { }

  ngOnInit(): void {
    this.searchAccordingEmail("ja", true);

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  test(){
    this.searchAccordingName("a");
    this.searchAccordingEmail("a");
  }

  public setElements(elements: any){
    this.elements = elements;
  }

  public changeEmail(oldEmail:string, id:number): void {
    this._userManagementService.changeEmail(this, oldEmail, id);
  }

  public changeName(oldName:string, id:number): void {
    this._userManagementService.changeName(this, oldName, id);
  }

  public search(phrase:string, option:string){
    if(option == "name"){
      this.searchAccordingName(phrase, false);
    } else if(option == "email"){
      this.searchAccordingEmail(phrase, false);
    } else {
      console.log("Unknown option!")
    }
  }

  public doLastSearch(){
    if(this.last=="email"){
      this.searchAccordingEmail(this.lastPhrase, true);
    } else {
      this.searchAccordingName(this.lastPhrase, true);
    }
  }

  public searchAccordingEmail(email:string, reload:boolean = false): void {
    this.last = email;
    this.lastPhrase = email;
    this._userManagementService.searchAccordingEmail(this, email, reload);
  }

  public searchAccordingName(name:string, reload:boolean = false): void {
    this.last = "name";
    this.lastPhrase = name;
    this._userManagementService.searchAccordingName(this, name, reload);
  } 

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
