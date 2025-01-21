import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuanity: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = localStorage;

  constructor() {

    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      //compute totals based n the data that is read from storage
      this.computeCartTotals();

    }
  }

  addToCart(theCartItem: CartItem) {

    //check if item already present
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on id

      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      //increment quantity
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  }
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityvalue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityvalue += currentCartItem.quantity;
    }

    //publish the new values .... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuanity.next(totalQuantityvalue);

    this.logCartData(totalPriceValue, totalQuantityvalue);

    //persist cart data
    this.persisCartItems();
  }

  persisCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQuantityvalue: number) {

    console.log('contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name : ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice} , subTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice : ${totalPriceValue.toFixed(2)}`);
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {

    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }

  }

}
