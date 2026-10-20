import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { persistCart } from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

persistCart(store);
