import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { selectCartItems } from './cart.selectors';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  // Example effect: Save cart to local storage whenever it changes
  saveCartToLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.addItem, CartActions.removeItem, CartActions.updateItemQuantity, CartActions.clearCart),
    withLatestFrom(this.store.select(selectCartItems)),
    tap(([action, items]) => {
      localStorage.setItem('cart', JSON.stringify(items));
    })
  ), { dispatch: false });
}