import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';

/**
 * #### Description
 * Manages shopping cart and its template
 * Uses local storage
 * 
 * #### Version
 * since: V1.0.0
 * 
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  /**
   * #### Description
   * Creates an instance of shopping cart component.
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param _ourHttpClient for working with HTTP requests
   * @param router to navigate and redirects
   */
  constructor(private _ourHttpClient:HttpClient, private router: Router) { }
  products: any;

  /**
   * #### Description
   * Loads selected products from local storage
   * 
   * #### Version
   * since: V1.0.0
   * 
   * on init
   */
  ngOnInit(): void {
    this.products = this.getProducts();
  }

  /**
   * #### Description
   * Counts price of given products = price * amount
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param product given type of product
   * @returns price final price of hiven type of product
   */
  public countPrice(product:any): number {
    return product['quantity'] * product['price'];
  }

  /**
   * #### Description
   * Deletes component - product from shopping cart
   * Updates all appropriate prices
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param class_component template class of product
   * @param product_title title of product
   */
  public deleteComponent(class_component: string, product_title:string): void {
    var productParts:any = document.getElementsByClassName(class_component);
    var i:number;
    var k:number;
    var idOrder:string;
    var priceInputs: any;
    
    for(i=0; i< productParts.length; i=i + 1){

      idOrder =class_component.split('-').reverse()[0];
      priceInputs = document.getElementsByClassName("price-prod-" + idOrder);
      var priceOneInputs:any = document.getElementsByClassName("price-one-" + idOrder);

      for(k=0; k< priceInputs.length; k=k + 1){
        priceInputs[k].innerHTML = "0.0 &euro;";
        priceOneInputs[k].value = 0;
      }
      productParts[i].style.display= "none";
      
      this.updateLocalPrice(idOrder, true);
    }

    this.deleteFromCart(product_title);
  }

  /**
   * #### Description
   * Increase amount of given type of product
   * Updates all appropriate prices
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param class_component template class of product
   * @param product_title title of product
   */
  public increase(class_component: string, product_title:string): void{
    var counterInputs:any = document.getElementsByClassName(class_component);
    var i:number;
    
    this.increaseFromCart(product_title);

    for(i=0; i< counterInputs.length; i=i + 1){

      counterInputs[i].value = parseInt(counterInputs[i].value) + 1;
      this.updateLocalPrice(class_component.split('-').reverse()[0], false);
    }
  }

  /**
   * #### Description
   * Descrease amount of given type of product
   * Updates all appropriate prices
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param class_component template class of product
   * @param product_title title of product
   */
  public decrease(class_component: string, product_title:string): void{
    this.decreaseFromCart("comp-"+class_component.split('-').reverse()[0], product_title);

    var counterInputs:any = document.getElementsByClassName(class_component);
    var i:number;
  

    for(i=0; i< counterInputs.length; i=i + 1){

      if(counterInputs[i].value - 1 >= 0){
        counterInputs[i].value = parseInt(counterInputs[i].value) - 1;
        this.updateLocalPrice(class_component.split('-').reverse()[0], false);
      }
    }
   
  }

  /**
   * #### Description
   * Uodates local price for given product type
   * Finally call for update final price for all types of products
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param order order id
   * @param deleted if product is deleted
   */
  public updateLocalPrice(order: string, deleted:boolean): void{

    var counterInputs:any = document.getElementsByClassName("counter-" + order);
    var priceInputs:any = document.getElementsByClassName("price-prod-" + order);
    var priceOneInputs:any = document.getElementsByClassName("price-one-" + order);
    var i:number;
    
    for(i=0; i< counterInputs.length; i=i + 1){
      priceInputs[i].innerHTML = (priceOneInputs[i].value * counterInputs[i].value).toString() + " &euro;";
    }
    this.updateFinalPrice();
  }

  /**
   * #### Description
   * Updates final price for all products
   * 
   * #### Version
   * since: V1.0.0
   * 
   */
  public updateFinalPrice():void {
      var finalPriceArray = document.getElementsByClassName("whole-price");
      var priceArrays = document.querySelectorAll('*[class*="price-prod-"]');
      var wholePrice:number;
      var i:number;
      wholePrice = 0.0;

      for(i=0; i< priceArrays.length; i=i + 1){

        wholePrice = wholePrice + parseFloat(priceArrays[i].innerHTML.split(" &euro;")[0]);
      }

      wholePrice = wholePrice / 2.0;


      for(i=0; i< finalPriceArray.length; i=i + 1){
        finalPriceArray[i].innerHTML = wholePrice.toString() + " &euro;";
      }
    }

  /**
   * #### Description
   *  Obtains chosen products for shopping cart
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @returns products obtained products if some products were chosen 
   */
  public getProducts(): any{
    var cartString = localStorage.getItem("shoppingCartProducts");
    if(cartString === null){
      return null;
    } else {
      var dictionary = JSON.parse(cartString);
      return Object.keys(dictionary).map(function(key){
        return dictionary[key]; 
    });;
    }
  }

  /**
   * #### Description
   * Manages deletion of product type from cart
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param title title of given product (type)
   */
  public deleteFromCart(title: string): void {
    var cartString = localStorage.getItem("shoppingCartProducts");
    if(cartString !== null){
      var dictionary = JSON.parse(cartString);
      if( title in dictionary){
        delete dictionary[title];
        localStorage.setItem("shoppingCartProducts", JSON.stringify(dictionary));
      }
    }
  }

  /**
   * #### Description
   * Manages increase number of products in cart
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param title title of given product (type)
   */
  public increaseFromCart(title: string): void {
    var cartString = localStorage.getItem("shoppingCartProducts");
    if(cartString !== null){
      var dictionary = JSON.parse(cartString);
      if( title in dictionary){
        dictionary[title]['quantity'] = dictionary[title]['quantity'] + 1;
        localStorage.setItem("shoppingCartProducts", JSON.stringify(dictionary));
      }
    }
  }

  /**
   * #### Description
   * Manages decrease number of products in cart
   * 
   * #### Version
   * since: V1.0.0
   * 
   * @param class_component template class of product
   * @param title title of given product (type)
   */
  public decreaseFromCart(class_component: string, title: string): void {
    var cartString = localStorage.getItem("shoppingCartProducts");
    if(cartString !== null){
      var dictionary = JSON.parse(cartString);
      if( title in dictionary){
        if (dictionary[title]['quantity'] - 1 > 0 ){
          dictionary[title]['quantity'] = dictionary[title]['quantity'] - 1;
          localStorage.setItem("shoppingCartProducts", JSON.stringify(dictionary));
        } else {
          this.deleteComponent(class_component, title);
        }        
      }
    }
  }
}
