import { Component, OnInit } from '@angular/core';
import { LoggingInfoService } from '../services/logging-info.service';

/**
 * #### Description
 * Order completed component for management order completion - displaying products if order is payed
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.css']
})
export class OrderCompletedComponent implements OnInit {

  /**
   * #### Description
   * Creates an instance of order completed component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _loggingInfoService 
   */
  constructor(private _loggingInfoService :LoggingInfoService) { }

  products:any;

  /**
   * #### Description
   * Loads bought products if any
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
    this.products = this.getBoughtProducts();
  }

  /**
   * #### Description
   * Get bought products from local storage stored after user confirmed and payed
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns bought products 
   */
  getBoughtProducts():any{
    var string = localStorage.getItem("boughtProducts");
    var boughtProducts;
    if(string != null){
      this._loggingInfoService.user_bought_free_products();
      return boughtProducts = JSON.parse(string);
    }
    return []
  }
}
