import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';

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


  constructor(private _userManagementService: UserManagementService) { }

  ngOnInit(): void {
    //this.test();
    this.searchAccordingEmail("ja", true);
  }

  private test(){
    this._userManagementService.getRole('des');
  }

  public changeRole(role:string, name:string, previousRole:string):void {
    if(previousRole != role){
      this._userManagementService.setRole(role, name);
    } 
  }

  public search(phrase:string, option:string){
    if(option == "name"){
      this.searchAccordingName(phrase, false);
    } else if(option == "email"){
      this.searchAccordingEmail(phrase, false);
    } else {

    }
  }

  public setElements(elements: any){
    this.elements = elements;
  }
  
  public doLastSearch(){
    if(this.last=="email"){
      this.searchAccordingEmail(this.lastPhrase, true);
    } else {
      this.searchAccordingName(this.lastPhrase, true);
    }
  }

  public searchAccordingName(name:string, reload:boolean = false): void {
    this._userManagementService.searchAccordingName(this, name, reload);
  }

  public searchAccordingEmail(email:string, reload:boolean = false): void {
    this._userManagementService.searchAccordingEmail(this, email, reload);
  }
}
