import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  order :Order = new Order();


  constructor(private cart:CartService){

  }

  ngOnInit(){
  let cartData = this.cart.getCartDataFromLocalStorage();
  console.log("cartData",cartData);
  this.setCartItems(cartData)
  this.calculateTotalPrice();


  }
  calculateTotalPrice() {
    this.order.totalAmount = 0 ;
    this.order.totalDiscount = 0;
    this.order.products.forEach((product:any)=> {
      this.order.totalAmount += Number(product.totalPrice);
      this.order.totalDiscount += Number(product.disocunt);
    })

    this.order.finalAmount = this.order.totalAmount - this.order.totalDiscount;
  }


  setCartItems(cartData: any) {
    cartData.forEach((cartItem: any) => {
      let product = new Product();
      product.productName = cartItem.name;
      product.productImg = cartItem.productImageSlug[0]
      product.drugCode = cartItem.drugCode;
      product.description = cartItem.description;
      product.brand = cartItem.brand;
      product.type = cartItem.type;
      product.actualPrice = cartItem.actualPrice;
      product.discountPrice = cartItem.discountPrice;
      product.quantity = 1
      product.disocunt = Number(cartItem.actualPrice) - Number(cartItem.discountPrice);
      product.totalPrice = Number(cartItem.discountPrice) * product.quantity;
      this.order.products.push(product);
    })
  } 

  increase(index: number) {
    let productObj = this.order.products[index];
    productObj.quantity += 1;
    let price = Number(productObj.discountPrice) * productObj.quantity;
    console.log("price",price);
   // productObj.disocunt = (productObj.disocunt * productObj.quantity);
    productObj.totalPrice = price -  productObj.disocunt;
    this.calculateTotalPrice();
  }

  decrease(index:number){

  }

}


export class Order {
  orderId!:string;
  fullName!:string;
  mobileNo!:string;
  emailId!:string;
  totalAmount!:number;
  totalDiscount!:number;
  totalItems!:number;
  finalAmount!:number;
  taxAmout!:number;
  deliveryType!:string;
  isPaymentCompleted:boolean = false;
  addressDetails:Address = new Address();
  products: Product[] = [] 
}

export class Address {
  city!:string;
  pincode!:number;
  state!:string;
  addressLine1!:string;
  addressLine2!:string;
}

export class Product {
  productName!:string;
  productImg!:string;
  actualPrice!:number;
  quantity!:number;
  drugCode!:string;
  discountPrice!:number;
  description!:string;
  brand!:string;
  type!:string;
  totalPrice!:number;
  disocunt!:number;
}