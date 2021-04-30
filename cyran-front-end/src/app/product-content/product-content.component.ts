import { Component, OnInit } from '@angular/core';

/**
 * #### Description
 * Component containing products
 * Withou business logic
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.css']
})
export class ProductContentComponent implements OnInit {

  /**
   * #### Description
   * Creates an instance of product content component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  constructor() { }

  /**
   * #### Description
   * On init - empty method
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
  }

}
