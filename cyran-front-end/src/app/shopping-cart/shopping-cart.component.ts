import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private _ourHttpClient:HttpClient, private router: Router) { }
  products: any;

  ngOnInit(): void {
    this.products = this.getProducts();
  }

  public countPrice(product:any): number {
    return product['quantity'] * product['price'];
  }

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

  public increase(class_component: string, product_title:string): void{
    var counterInputs:any = document.getElementsByClassName(class_component);
    var i:number;
    
    this.increaseFromCart(product_title);

    for(i=0; i< counterInputs.length; i=i + 1){

      counterInputs[i].value = parseInt(counterInputs[i].value) + 1;
      this.updateLocalPrice(class_component.split('-').reverse()[0], false);
    }
  }

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
