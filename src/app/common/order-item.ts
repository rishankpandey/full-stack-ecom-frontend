import { CartItem } from "./cart-item";

export class OrderItem {
    imageurl: string;
    unitPrice: number;
    quantity: number;
    productId: string;

    constructor(cartItem: CartItem){
        this.imageurl=cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;

    }
    

}
