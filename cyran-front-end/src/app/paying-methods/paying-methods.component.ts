
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { OrderManagementService} from '../services/order-management.service';

/**
 * #### Description
 * Representation of order
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
interface Order {
  userName: string;
  shipmentAddress: string;
  cartInfo: { products: [], finalPrice: number };
  creditCardInfo: { iban: number, valid: string, cvc: string }
}

/**
 * #### Description
 * Manages collecting information about paying methods and finalizes order
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-paying-methods',
  templateUrl: './paying-methods.component.html',
  styleUrls: ['./paying-methods.component.css']
})
export class PayingMethodsComponent implements OnInit {

  cardnumber: string;
  namecard: string;
  carddate: string;
  seccode: string;
  minPriceBankTransfer: number;
  maxPriceBankTransfer: number;
  minPricePaymentMethod: number;
  maxPricePaymentMethod: number;
  minPriceCashOnDelivery: number;
  maxPriceCashOnDelivery: number;
  payment: number;
  order: Order = { userName: "", shipmentAddress: "", cartInfo: { products: [], finalPrice: 0 }, creditCardInfo: { iban: 0, valid: "", cvc: "" } };


  example = {
    "userName": "Viktors",
    "shipmentAddress": "between Earth and Moon",
    "cartInfo": {
      "products": [
        {
          "name": "orange",
          "description": "orange orange",
          "url": "orange.com",
          "quantity": 1,
          "price": 2
        }
      ],
      "finalPrice": 10
    },
    "creditCardInfo": {
      "iban": 348346,
      "valid": "24/11/2020",
      "cvc": "000"
    }
  };

  /**
   * #### Description
   * Creates an instance of paying methods component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _orderManagementService service for managing order creation
   */
  constructor(private _orderManagementService: OrderManagementService) { }

  /**
   * #### Description
   * Contains initialization of basic fees for creation of order
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  ngOnInit(): void {
    var wholePrice = this.countWholePrice();
    this.minPriceBankTransfer = wholePrice;
    this.maxPriceBankTransfer = this.minPriceBankTransfer + 100;
    this.minPricePaymentMethod = wholePrice;
    this.maxPricePaymentMethod = this.minPricePaymentMethod + 100;
    this.minPriceCashOnDelivery = wholePrice + 2.0;
    this.maxPriceCashOnDelivery = this.minPriceCashOnDelivery + 100;
  }

  /**
   * #### Description
   * Counts whole price for order
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns whole price 
   */
  countWholePrice(): number {
    var cartString = localStorage.getItem("shoppingCartProducts");
    var wholePrice: number = 0;
    if (cartString !== null) {
      var dictionary = JSON.parse(cartString);
      for (var record in dictionary) {
        wholePrice = wholePrice + dictionary[record]['quantity'] * dictionary[record]['price'];
      }
      return wholePrice;
    }
    return -1;
  }

  /**
   * #### Description
   * Renames key in dict and after it removes older one
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param obj dictionary
   * @param oldKey old key which will be removed after copy
   * @param newKey new key which will hold value from old key
   */
  private renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

  /**
   * #### Description
   * Loads products from shopping cart - local storage
   * Renames product title to product name
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns products resulting array of products from shopping cart
   */
  getProducts():any {
    var cartString = localStorage.getItem("shoppingCartProducts");
    if (cartString !== null) {
      var dictionary = JSON.parse(cartString);
      var array = Object.values(dictionary);
      if( array.length == 0){
        return []
      }
      array.forEach( obj => this.renameKey( obj, 'title', 'name' ) );
      return array;
    }
    return [];
  }

  /**
   * #### Description
   * Obtains delivery information from local storage
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns delivery information loaded delivery information if exists
   */
  getDeliveryInformation(): any {
    var deliveryInfo = localStorage.getItem("deliveryInfo");
    if (deliveryInfo === null) {
      return null;
    } else {
      return JSON.parse(deliveryInfo);
    }
  }

  /**
   * #### Description
   * Saves card information -- TODO
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param cardInfo object with information about card
   */
  saveCard(cardInfo: any): void {}

  /**
   * #### Description
   * Prepares all information about  order and delegates sending request to order service for its creation
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param cardInfo object with information about card if exists
   */
  public saveOrder(cardInfo:any): void {
    var deliveryInfo = this.getDeliveryInformation();

    this.order.userName = deliveryInfo.name + deliveryInfo.surname;
    this.order.shipmentAddress = deliveryInfo.address;
    this.order.cartInfo.products =  this.getProducts();
    this.order.cartInfo.finalPrice = this.payment;
    
    if(cardInfo != null) {
      this.order.creditCardInfo.iban = cardInfo.cardnumber;
      this.order.creditCardInfo.valid = cardInfo.carddate;
      this.order.creditCardInfo.cvc = cardInfo.seccode;
    } else {
      this.order.creditCardInfo.iban = 0;
      this.order.creditCardInfo.valid = "none";
      this.order.creditCardInfo.cvc = "none";
    }

    this._orderManagementService.createOrder(this.order);

    // this.router.navigateByUrl('/completed');
  }

  /**
   * #### Description
   * Manages payment method using card
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param cardInfo object with information about card
   * @returns  
   */
  public cardPayment(cardInfo: any): void {
    this.saveOrder(cardInfo);
  }

  /**
   * #### Description
   * Updates value of price after moving slider
   *  
   * #### Version
   * since: V1.0.0
   * 
   * @param event mat slider event of changing slider
   */
  onInputChange(event: MatSliderChange) {
    this.payment = event.value;
  }

  /**
   * #### Description
   * Manages bank transfer payment method
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  public bankTransferPayment(){
    this.saveOrder(null);
  }

  /**
   * #### Description
   * Manages cash on delivery payment method
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  public cashOnDeliveryPayment(){
    this.saveOrder(null);
  }
}
