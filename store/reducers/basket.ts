// basket.ts

import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '../../types';

interface BasketItem extends Product {
  qty: number;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: []
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload
      );

      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number, qty: number }>) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (itemIndex >= 0) {          
         state.items[itemIndex].qty = action.payload.qty > 0 ? action.payload.qty : 1;
      }
    }
  }
});

export const { addToBasket, removeFromBasket, updateQuantity } = basketSlice.actions;

export default basketSlice.reducer;



// selectors 

export const selectBasketItems = createSelector(
  (state: RootState) => state.basket,
  (basket) => basket.items
);
export const selectBasketTotal = createSelector(
  (state: RootState) => state.basket.items,
  (items) => items.reduce((total, item) => total + item.qty * item.price, 0)
);
export const selectTotalQuantity = createSelector(
  (state: RootState) => state.basket.items,
  (items) => items.reduce((total, item) => total + item.qty, 0)
);