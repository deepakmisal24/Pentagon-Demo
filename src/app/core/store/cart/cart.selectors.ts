import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';


interface CartState {
  items: any[];
}


export const selectCartState =
  createFeatureSelector<CartState>('cart');


// CART ITEMS

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);


// TOTAL ITEMS

export const selectCartTotalItems = createSelector(

  selectCartItems,

  (items: any[]) =>

    items.reduce(
      (total: number, item: any) =>
        total + item.quantity,
      0
    )

);


// TOTAL PRICE

export const selectCartTotalPrice = createSelector(

  selectCartItems,

  (items: any[]) =>

    items.reduce(
      (total: number, item: any) =>
        total + (item.price * item.quantity),
      0
    )

);