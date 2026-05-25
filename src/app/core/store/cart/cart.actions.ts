import { createAction, props } from '@ngrx/store';

export const addItem = createAction('[Cart] Add Item', props<{ item: any }>());
export const removeItem = createAction('[Cart] Remove Item', props<{ id: string }>());
export const updateItemQuantity = createAction('[Cart] Update Quantity', props<{ id: string, quantity: number }>());
export const clearCart = createAction('[Cart] Clear Cart');