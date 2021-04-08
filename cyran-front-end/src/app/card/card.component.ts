import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingErrorsService } from '../services/logging-errors.service';
import { SuccessMessageComponent } from '../info-snackbars/success-message/success-message.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private _ourHttpClient:HttpClient, private _snackBar: MatSnackBar, private _loggingErrorsService: LoggingErrorsService) { }

  ngOnInit(): void {
    if(false){
      this.insertProducts();
    }  else {
      this.getFirst6ProductsLocally()
    }
  }

  titles = []

  public fillProducts() : void {
  }

  public getFirst6ProductsLocally(): void{
    this.pushProduct("Originálna hádanka",
    'Pôvodná hádanka. Zistíte, kto kde býva, čo fajčí, pije a o aké zviera sa stará? A kto z nich chová rybičky?',
    1.51, "http://localhost:4200/assets/einstein/004.jpg", 1000000);
    this.pushProduct("Kamarátky",
    'Pohromade je päť kamarátok. Každá má rada niektorého herca, počúva iný štýl hudby, má iné koníčky a aj sa inak stravuje. Ktorej chutia ovsené vločky?',
    1.45, "http://localhost:4200/assets/einstein/005.jpg", 1000000);
    this.pushProduct("Susedia",
    'Päť susedov. Kto z nich najradšej cestuje trolejbusom? Každý má meno, prezývku, operačný systém, hobby a rád chodí iným dopravným prostriedkom.',
    2.50, "http://localhost:4200/assets/einstein/006.jpg", 1000000);
    this.pushProduct("Zastávka",
    'Na zastávke stojí 5 rôznych ľudí. Kto z nich má hokejový dres? Každý má iný názor na hudbu, dovolenku, niečo iné si vypije a taktiež má niečo iné oblečené.',
    1.70, "http://localhost:4200/assets/einstein/007.jpg", 1000000);
    this.pushProduct("Autá",
    'Vedľa seba je zaparkovaných 5 áut. Každé má iného majiteľa, farbu, poznávaciu značku a pneumatiky. Kto jazdieva na zelenom aute?',
    0.50, "http://localhost:4200/assets/einstein/008.jpg", 1000000);
    this.pushProduct("Notebooky",
    'Na stole je 5 notebookov s rôznymi značkami, veľkosťami disku, farbami, kancelárskymi balíkmi a operačnými systémami. Ktorý z nich je značky Samsung?',
    0.94, "http://localhost:4200/assets/einstein/009.jpg", 1000000);
  }

  public insertProducts(): void{
    this.insert("Originálna hádanka",
    'Pôvodná hádanka. Zistíte, kto kde býva, čo fajčí, pije a o aké zviera sa stará? A kto z nich chová rybičky?',
    1.51, "http://localhost:4200/assets/einstein/004.jpg", 1000000);
    this.insert("Kamarátky",
    'Pohromade je päť kamarátok. Každá má rada niektorého herca, počúva iný štýl hudby, má iné koníčky a aj sa inak stravuje. Ktorej chutia ovsené vločky?',
    1.45, "http://localhost:4200/assets/einstein/005.jpg", 1000000);
    this.insert("Susedia",
    'Päť susedov. Kto z nich najradšej cestuje trolejbusom? Každý má meno, prezývku, operačný systém, hobby a rád chodí iným dopravným prostriedkom.',
    2.50, "http://localhost:4200/assets/einstein/006.jpg", 1000000);
    this.insert("Zastávka",
    'Na zastávke stojí 5 rôznych ľudí. Kto z nich má hokejový dres? Každý má iný názor na hudbu, dovolenku, niečo iné si vypije a taktiež má niečo iné oblečené.',
    1.70, "http://localhost:4200/assets/einstein/007.jpg", 1000000);
    this.insert("Autá",
    'Vedľa seba je zaparkovaných 5 áut. Každé má iného majiteľa, farbu, poznávaciu značku a pneumatiky. Kto jazdieva na zelenom aute?',
    0.50, "http://localhost:4200/assets/einstein/008.jpg", 1000000);
    this.insert("Notebooky",
    'Na stole je 5 notebookov s rôznymi značkami, veľkosťami disku, farbami, kancelárskymi balíkmi a operačnými systémami. Ktorý z nich je značky Samsung?',
    0.94, "http://localhost:4200/assets/einstein/009.jpg", 1000000);
    this.insert("Planéty",
    'Vedľa seba je päť odlišných planét. Každá má iné pomenovanie, inú atmosféru, politické zriadenie, veľkosť a taktiež má každá z nich mesiace. Na ktorej planéte je feudalizmus?',
    1.54, "http://localhost:4200/assets/einstein/010.jpg", 1000000);
    this.insert("Knihožrúti",
    'Skupina čitateľov, ktorí majú radi knihy rôznych žánrov a od rôznych autorov. Taktiež každý preferuje inú väzbu a iné miesto na čítanie. Kto z nich si rád prečíta dobré fantasy?',
    1.20, "http://localhost:4200/assets/einstein/011.jpg", 1000000);
    this.insert("Šachisti",
    'Šach je hra bohatá. V tomto príklade je 5 šachistov, pričom každý rád hráva iný šachový variant, inú hru. K tomu obľúbená figúra, spôsob výhry a obľúbený čas na partiu. Kto obľubuje taliansku hru?',
    1.42, "http://localhost:4200/assets/einstein/012.jpg", 1000000);
    this.insert("Ostrovy",
    'Ostrovy patriace rôznym krajinám, ktoré majú svoje zaujímavosti, vegetáciu a možnosti ubytovania. Ktorý má akých návštevníkov a na ktorom ostrove sú palmy?',
    1.29, "http://localhost:4200/assets/einstein/013.jpg", 1000000);
    this.insert("Chalani",
    '5 chalanov s rôznymi menami, obľúbenými športami, do toho rôzne zlozvyky, počítačové hry a niečo z toho, čo si radi pozrú v televízii. Kto z nich má zlozvyk klamať?',
    0.95, "http://localhost:4200/assets/einstein/014.jpg", 1000000);
    this.insert("Blogeri",
    'Na tému odvody bloguje niekto z blogerov. Kto? Dohromady je vedľa seba 5 blogerov a každý z nich má inú prezývku, obľúbenú tému, redakčný systém a návštevnosť na blogu.',
    1.65, "http://localhost:4200/assets/einstein/015.jpg", 1000000);
    this.insert("Umelkyne",
    'Kresliť, maľovať alebo inak vytvárať umelecké diela sa dá rôznymi spôsobmi. Ktorá z umelkýň najradšej používa uhlík? 5 umelkýň, pričom každá rada pracuje s iným nástrojom, kreslí niečo iné, pochádza z iného mesta a taktiež má rôzny vek.',
    2.25, "http://localhost:4200/assets/einstein/016.jpg", 1000000);
    this.insert("Rozprávkové bytosti",
    'Rozprávky, rozpávkové bytosti, kúzla a moc, to všetko je možné nájsť v knihách, filmoch či hrách. Vedľa seba stoja rozličné postavy. Dokážete ich správne identifikovať? A kto je zo Sunvelie?',
    1.38, "http://localhost:4200/assets/einstein/017.jpg", 1000000);
    this.insert("Zberatelia",
    'Zberatelia dokážu zbierať niekedy naozaj čokoľvek. V tejto hádanke je vedľa seba niekoľko z nich. Každý z nich rád zbiera hokejové kartičky, autíčka, poštové známky a mince. Kto zbiera hokejové kartičky San Jose Sharks?',
    0.74, "http://localhost:4200/assets/einstein/018.jpg", 1000000);
    this.insert("Vane",
    'Aj také na prvý pohľad bežné veci, ako sú vane, môžu byť veľmi rôznorodé. Ktorá je aká? Ktorá má akú šírku? Z čoho sa ktorá vyrobila? A v ktorom štáte? A ako sú zafarbené? A ktorá z nich je modrá?',
    1.85, "http://localhost:4200/assets/einstein/019.jpg", 1000000);
    this.insert("Učitelia",
    'Spoznajte lepšie päticu učiteľov. Každý z nich učí niektorý predmet a okrem toho aj cudzí jazyk. Okrem odlišných mien a vekov majú aj iný pohľad na voľnočasové aktivity. Kto sa čomu venuje?',
    0.91, "http://localhost:4200/assets/einstein/020.jpg", 1000000);
    this.insert("Alkoholici",
    'Alkohol je ťažký súper, na tom sa zhodnú všetky ústavy vytvorené na liečbu tejto závislosti. V hádanke je 5 alkoholikov. Každý z nich má rád konkrétnu krajinu pôvodu u vína, značku piva, neodolá niektorému silnejšiemu alkoholu a nejakým spôsobom sa z krčmy každý z nich dostane, až na jednu výnimku. Kto z krčmy vôbec neodchádza?',
    0.32, "http://localhost:4200/assets/einstein/021.jpg", 1000000);

  }

  public insert(name:string, description:string, price:number, url:string, quantity:number): void {
    var dictionary = {}
    dictionary['name'] = name;
    dictionary['description'] = description;
    dictionary['price'] = price;
    dictionary['url'] = url;
    dictionary['quantity'] = quantity;

    if(this.titles.length < 6){
      this.titles.push(dictionary);
    }

    this._ourHttpClient.post("http://localhost:8080/create/product", dictionary, { responseType: 'text' as 'json' }).subscribe(
      (response)=>{
        return dictionary;
      },
      (error)=>{
        console.error(error);
        this._loggingErrorsService.captureError(error);
        return dictionary;
      });

  }

  public pushProduct(name:string, description:string, price:number, url:string, quantity:number):void {
      var dictionary = {}
      dictionary['name'] = name;
      dictionary['description'] = description;
      dictionary['price'] = price;
      dictionary['url'] = url;
      dictionary['quantity'] = quantity;
      this.titles.push(dictionary);
  }

  public addToChart(itemTitle: string, price: number): void{
      var shoppingCartProducts;
      var newItem = {}
      newItem['title'] = itemTitle;
      newItem['price'] = price;
      newItem['quantity'] = 1;

      if((shoppingCartProducts = localStorage.getItem("shoppingCartProducts")) === null){
        shoppingCartProducts = {};
      } else {
        try {
          shoppingCartProducts = JSON.parse(shoppingCartProducts );
        } catch(err) {
          this._loggingErrorsService.captureError(err);
          shoppingCartProducts = {};
        }  
      }

      if(shoppingCartProducts[itemTitle] === null || typeof shoppingCartProducts[itemTitle] === "undefined"){
        shoppingCartProducts[itemTitle] = newItem;
      } else {
        shoppingCartProducts[itemTitle]['quantity'] = shoppingCartProducts[itemTitle]['quantity'] + 1;
      }

      localStorage.setItem("shoppingCartProducts", JSON.stringify(shoppingCartProducts));
  }

  public getFirstSixProducts(): any {
    return this._ourHttpClient.get("http://localhost:8080/products").subscribe(
      (response)=>{
      },
      (error)=>{
        this._loggingErrorsService.captureError(error);
        console.error(error);
      });
  }

  addedToCartInfo() {
    SuccessMessageComponent.openSnackBarSuccess(this._snackBar, "Product added to cart!");
  }
}
