import { describe, it, expect } from "vitest";
import cartReducer, { addToCart, clearCart, decrementItem, removeFromCart, selectCartCount, selectCartTotal } from "./cartSlice";
import authReducer, { login, logout } from "./authSlice";

const stateWith = (cart) => ({ cart });

describe("cartSlice", () => {
  it("adds a new item", () => {
    const state = cartReducer(undefined, addToCart(1));
    expect(state.items).toEqual([{ id: 1, qty: 1 }]);
  });

  it("increments quantity for an existing item", () => {
    let state = cartReducer(undefined, addToCart(1));
    state = cartReducer(state, addToCart(1));
    expect(state.items).toEqual([{ id: 1, qty: 2 }]);
  });

  it("removes an item when quantity drops to zero", () => {
    let state = cartReducer(undefined, addToCart(1));
    state = cartReducer(state, decrementItem(1));
    expect(state.items).toEqual([]);
  });

  it("removes and clears items", () => {
    let state = cartReducer(undefined, addToCart(1));
    state = cartReducer(state, addToCart(2));
    state = cartReducer(state, removeFromCart(1));
    expect(state.items).toEqual([{ id: 2, qty: 1 }]);
    expect(cartReducer(state, clearCart()).items).toEqual([]);
  });

  it("computes count and total", () => {
    const state = stateWith({ items: [{ id: 1, qty: 2 }, { id: 2, qty: 1 }] });
    expect(selectCartCount(state)).toBe(3);
    expect(selectCartTotal(state)).toBe(89 * 2 + 45);
  });
});

describe("authSlice", () => {
  it("logs in and out", () => {
    let state = authReducer(undefined, login("Sam"));
    expect(state.user).toBe("Sam");
    state = authReducer(state, logout());
    expect(state.user).toBeNull();
  });
});
