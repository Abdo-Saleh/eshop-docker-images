import { Component, OnInit } from '@angular/core';

/**
 * #### Description
 * Component for web page footer
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  /**
   * #### Description
   * Creates an instance of footer component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  constructor() { }

  /**
   * #### Description
   * On init - no logic is neccessary
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
  }

}
