import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems:any = [];
   cartCount$ = new Subject();
   cartCountObs = this.cartCount$.asObservable();
 
   order:Order = new Order();


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


  setOrder(orderObj:any){
    this.order = orderObj;
  }


getOrder(){
  return this.order;
}

  clearCart() {
    localStorage.removeItem("cart");
    this.cartItems = [];
    this.sendCartCount(this.cartItems.length);
  }
}


