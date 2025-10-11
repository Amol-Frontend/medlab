import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems:any = [];
   cartCount$ = new Subject();
   cartCountObs = this.cartCount$.asObservable();
 

  constructor() { }


  addToCart(item: any) {
    this.cartItems = this.getCartDataFromLocalStorage();
    this.cartItems.push(item);
    // add data in local storage
    let cartItemsStr = JSON.stringify(this.cartItems);
    localStorage.setItem("cart", cartItemsStr);
    this.sendCartCount(this.cartItems.length);
  }


  getCartDataFromLocalStorage(): any {
    let cartDetails =  localStorage.getItem("cart");
    if(cartDetails) {
     let cartData = JSON.parse(cartDetails);
      return cartData;
    }else {
      return [];
    }
  }

  sendCartCount(count:number){
    this.cartCount$.next(count);
  }



}


