import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from "./features/cart/cartSlice";

const products = [
  { id: 1, name: "Wireless Mouse", price: 799 },
  { id: 2, name: "Mechanical Keyboard", price: 2499 },
  { id: 3, name: "USB-C Hub", price: 1599 },
];

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

export default function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <main>
      <h1>Redux Toolkit Shopping Cart</h1>
      <p>Items in cart: {itemCount}</p>

      <section>
        <h2>Products</h2>
        {products.map((product) => (
          <div key={product.id}>
            <span>
              {product.name} — {formatPrice(product.price)}
            </span>{" "}
            <button onClick={() => dispatch(addToCart(product))}>
              Add to cart
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              <strong>{item.name}</strong> — {formatPrice(item.price)} ×{" "}
              {item.quantity} = {formatPrice(item.price * item.quantity)}{" "}
              <button
                aria-label={`Decrease ${item.name} quantity`}
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                -
              </button>{" "}
              <button
                aria-label={`Increase ${item.name} quantity`}
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>{" "}
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))
        )}

        <h3>Total: {formatPrice(cartTotal)}</h3>
        <button
          onClick={() => dispatch(clearCart())}
          disabled={cartItems.length === 0}
        >
          Clear cart
        </button>
      </section>
    </main>
  );
}