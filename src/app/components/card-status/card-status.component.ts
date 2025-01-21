import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrl: './card-status.component.css'
})
export class CardStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updatecartStatus();

  }
  updatecartStatus() {
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //subscribe to the cart totalQuantity
    this.cartService.totalQuanity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
