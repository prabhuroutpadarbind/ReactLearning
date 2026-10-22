import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";

export const makeStore = () =>
  configureStore({ reducer: { cart: cartReducer, auth: authReducer } });

export default makeStore();
