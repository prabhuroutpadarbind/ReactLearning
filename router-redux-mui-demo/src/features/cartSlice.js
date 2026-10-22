import { createSelector, createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, { payload: id }) {
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty += 1;
      else state.items.push({ id, qty: 1 });
    },
    decrementItem(state, { payload: id }) {
      const item = state.items.find((i) => i.id === id);
      if (item.qty > 1) item.qty -= 1;
      else state.items = state.items.filter((i) => i.id !== id);
    },
    removeFromCart(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addToCart, decrementItem, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);

const selectItems = (state) => state.cart.items;

export const selectCartLines = createSelector([selectItems], (items) =>
  items.map((i) => ({ ...products.find((p) => p.id === i.id), qty: i.qty }))
);

export const selectCartTotal = createSelector([selectCartLines], (lines) =>
  lines.reduce((sum, l) => sum + l.price * l.qty, 0)
);

export default cartSlice.reducer;
