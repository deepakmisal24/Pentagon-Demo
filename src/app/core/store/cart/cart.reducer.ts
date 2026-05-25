import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  items: any[];
}

export const initialCartState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addItem, (state, { item }) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      };
    }
    return { ...state, items: [...state.items, { ...item, quantity: 1 }] };
  }),
  on(CartActions.removeItem, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  })),
  on(CartActions.updateItemQuantity, (state, { id, quantity }) => ({
    ...state,
    items: state.items.map(item => item.id === id ? { ...item, quantity } : item)
  })),
  on(CartActions.clearCart, state => ({ ...state, items: [] }))
);