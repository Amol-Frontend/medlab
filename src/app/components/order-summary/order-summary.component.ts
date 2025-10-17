import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Order } from '../cart/cart.component';
import { DecimalPipe, NgFor } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [NgFor,DecimalPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {


  order: Order | null = null;
  constructor(private cart: CartService,private data:DataService,private router:Router) {

  }

  ngOnInit() {

    this.order = this.cart.getOrder();

  }

  placeOrder() {
    if (this.order) {
      this.order.orderId = this.genereateRandomNumber();
      this.data.postDataFromServer("orders",this.order).subscribe({
        next: (response:any)=> {
            if(response){
              this.cart.clearCart();
              this.cart.setOrder(new Order());
              alert("Your order has been placed successfully");
              this.router.navigate(['/home'])
            }
        },
        error : (error:any)=> {

        }
      })
    }

  }
  genereateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

}
