import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryAddressComponent } from '../delivery-address/delivery-address.component';
import { Router } from '@angular/router';
declare var bootstrap: any; // Declare bootstrap if not using a dedicated library

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,FormsModule,DeliveryAddressComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  order :Order = new Order();
  bootstrapModal: any;

  @ViewChild('addressModal', { static: false }) addressModal!: ElementRef

  constructor(private cart:CartService,private router:Router){

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


  flag:boolean = false
  addNewAddress(){
    this.flag = true;
  }

  getSelAddress(address: any) {
    this.order.addressDetails.addressLine1 = address.line1;
    this.order.addressDetails.addressLine2 = address.line2;
    this.order.addressDetails.city = address.city;
    this.order.addressDetails.state = address.state;
    this.order.addressDetails.pincode = address.pincode;
    this.bootstrapModal.hide();
  }


  navigateTo(){
    this.cart.setOrder(this.order);
    this.router.navigate(['/patientDetails']);
  }

    ngAfterViewInit() {
    this.bootstrapModal = new bootstrap.Modal(this.addressModal.nativeElement);
  }

}


export class Order {
  orderId!:string;
  fullName!:string;
  mobileNo!:string;
  emailId!:string;
  gender!:string;
  relation!:string;
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