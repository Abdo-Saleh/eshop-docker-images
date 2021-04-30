import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';

/**
 * #### Description
 * Interface for role management with basic information as id, name and role
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
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

/**
 * #### Description
 * Component for management roles in eshop - only admin should have access into it
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
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

  /**
   * #### Description
   * Creates an instance of admin component.
   * 
   * #### Version
   * since: V1.0.0
   *
   * @param _userManagementService injects service for user management - especially changing roles
   */
  constructor(private _userManagementService: UserManagementService) { }

  /**
   * #### Description
   * Initially loads some data
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
    //this.test();
    this.searchAccordingEmail("ja", true);
  }

  /**
   * #### Description
   * Test functionality of getting role
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  private test(){
    this._userManagementService.getRole('des');
  }

  /**
   * #### Description
   * Changes role of user in security eshop to new role
   * Checks if previous role is not same as new role
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param role new role which should be set
   * @param name login name of user in security eshop
   * @param previousRole previous role which should be changes, should be different as role
   */
  public changeRole(role:string, name:string, previousRole:string):void {
    if(previousRole != role){
      this._userManagementService.setRole(role, name);
    } 
  }

  /**
   * #### Description
   * General search method. Searches according phrase from chosen option (name or email)
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param phrase phrase which should be used for search
   * @param option target type of search - for example name - search according name
   */
  public search(phrase:string, option:string){
    if(option == "name"){
      this.searchAccordingName(phrase, false);
    } else if(option == "email"){
      this.searchAccordingEmail(phrase, false);
    } else {

    }
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
   * Searchs according name
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param name login name of user
   * @param [reload] if true search will be repeated with login name again otherwise not
   */
  public searchAccordingName(name:string, reload:boolean = false): void {
    this._userManagementService.searchAccordingName(this, name, reload);
  }

  /**
   * #### Description
   * Searchs according email
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param email email of user
   * @param [reload] if true search will be repeated with email again otherwise not
   */
  public searchAccordingEmail(email:string, reload:boolean = false): void {
    this._userManagementService.searchAccordingEmail(this, email, reload);
  }
}
