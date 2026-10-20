import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "redux-toolkit-shopping-cart";

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

const initialState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;

// Keep browser storage in sync after each cart action.
// This subscription is registered by the store module below.
export function persistCart(store) {
  let previousItems = store.getState().cart.items;

  store.subscribe(() => {
    const nextItems = store.getState().cart.items;
    if (nextItems !== previousItems) {
      previousItems = nextItems;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
      } catch {
      }
    }
  });
}