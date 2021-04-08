import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingErrorsService } from '../services/logging-errors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';
import { ErrorMessageComponent } from '../info-snackbars/error-message/error-message.component';

export interface PeriodicElement {
  id: number;
  name: string;
  role: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', role: "assistant"},
  {id: 2, name: 'Helium', role: "user"},
  {id: 3, name: 'Carboneum', role: "admin"},
  {id: 4, name: 'Kalium', role: "user"}
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role', 'change-role'];
  dataSource = ELEMENT_DATA;
  phrase: string;
  lastPhrase: string;
  last: string;
  elements: any;
  option: string = "name";
  optionRole: string;


  constructor(private _snackBar: MatSnackBar, private _ourHttpClient: HttpClient, private _loggingErrorsService: LoggingErrorsService) { }

  ngOnInit(): void {
    //this.test();
    this.searchAccordingEmail("ja", true);
  }

  private test(){
    this.getRole('des');
  }

  public changeRole(role:string, name:string, previousRole:string):void {
    if(previousRole != role){
      this.setRole(role, name);
    } 
  }

  public setRole(role:string, name:string):void {
    var dictionary = {}
    dictionary['name'] = name;
    dictionary['role'] = role;
    dictionary['password'] = "";

    this._ourHttpClient.post("http://localhost:8080/setRole", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Role " + role + " has been successfully set!");
        return dictionary;
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured while setting role " + role + "! Try it again later!");
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });

  }

  public getRole(name:string):void {
    var dictionary = {}
    dictionary['name'] = name;
    dictionary['password'] = "";

    this._ourHttpClient.post("http://localhost:8080/getRole", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Role " + name + " has been successfully loaded!");
        return response;
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured while getting role " + name + "! Try it again later!");
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });

  }


  public search(phrase:string, option:string){

    if(option == "name"){
      this.searchAccordingName(phrase, false);
    } else if(option == "email"){
      this.searchAccordingEmail(phrase, false);
    } else {

    }
  }

  public doLastSearch(){
    if(this.last=="email"){
      this.searchAccordingEmail(this.lastPhrase, true);
    } else {
      this.searchAccordingName(this.lastPhrase, true);
    }
  }

  public searchAccordingName(name:string, reload:boolean = false): void {
    var dictionary = {}
    dictionary['name'] = name;
    this.last = "name";
    this.lastPhrase = name;

    this._ourHttpClient.post("http://localhost:8080/name", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        if(!reload){
          SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Search results according name prepared!");
        }
        this.elements = JSON.parse(response.toString());
        return dictionary;
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured while obtaining search results according name! Try it again later!");
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });

  }


  public searchAccordingEmail(email:string, reload:boolean = false): void {
    var dictionary = {}
    dictionary['email'] = email;
    this.last = email;
    this.lastPhrase = email;

    this._ourHttpClient.post("http://localhost:8080/email", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        if(!reload){
          SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Search results according email prepared!");
        }
        this.elements = JSON.parse(response.toString());
        return dictionary;
      },
      (error)=>{
        ErrorMessageComponent.openSnackBarError(this._snackBar, "Error occured while obtaining search results according email! Try it again later!");
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });

  }
}
