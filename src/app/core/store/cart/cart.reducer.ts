import { createAction, props } from '@ngrx/store';


// ADD ITEM

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: any }>()
);


// REMOVE ITEM

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ id: number }>()
);


// UPDATE ITEM QUANTITY

export const updateItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ id: number; quantity: number }>()
);


// CLEAR CART

export const clearCart = createAction(
  '[Cart] Clear Cart'
);