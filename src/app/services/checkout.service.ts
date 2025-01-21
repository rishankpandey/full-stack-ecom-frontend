import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseurl =environment.ecomApiUrl + '/checkout/purchase';
  
  private paymentIntentUrl = environment.ecomApiUrl + '/checkout/payment-intent';
  
  constructor( private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>{
    console.log(purchase);
    return this.httpClient.post<Purchase>(this.purchaseurl,purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

}
