import { Component, OnInit } from '@angular/core';
import { LoggingInfoService } from '../services/logging-info.service';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.css']
})
export class OrderCompletedComponent implements OnInit {

  constructor(private _loggingInfoService :LoggingInfoService) { }

  products:any;

  ngOnInit(): void {
    this.products = this.getBoughtProducts();
  }

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
