import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.yourdomain.com/cart';

  syncCartWithServer(cartItems: any[]): Observable<any> {
    return this.http.post(this.apiUrl, { items: cartItems });
  }
}