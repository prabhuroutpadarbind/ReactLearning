import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { makeStore } from "./store";
import routes from "./routes";

function renderAt(path) {
  const store = makeStore();
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  return { router, store };
}

describe("routing", () => {
  it("redirects / to /products", () => {
    const { router } = renderAt("/");
    expect(router.state.location.pathname).toBe("/products");
    expect(screen.getByRole("heading", { name: "Products" })).toBeInTheDocument();
  });

  it("renders a product from the url param", () => {
    renderAt("/products/3");
    expect(screen.getByRole("heading", { name: "27-inch Monitor" })).toBeInTheDocument();
  });

  it("shows a message for an unknown product", () => {
    renderAt("/products/99");
    expect(screen.getByText("Product not found")).toBeInTheDocument();
  });

  it("renders the 404 page", () => {
    renderAt("/nowhere");
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
  });

  it("filters products with the q search param", () => {
    renderAt("/products?q=mouse");
    expect(screen.getByText("Ergonomic Mouse")).toBeInTheDocument();
    expect(screen.queryByText("USB-C Hub")).not.toBeInTheDocument();
  });

  it("updates the url when searching", async () => {
    const user = userEvent.setup();
    const { router } = renderAt("/products");
    await user.type(screen.getByLabelText("Search"), "hub");
    expect(router.state.location.search).toBe("?q=hub");
  });
});

describe("redux with routing", () => {
  it("adds to the cart and updates the badge", async () => {
    const user = userEvent.setup();
    const { store } = renderAt("/products/1");
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(store.getState().cart.items).toEqual([{ id: 1, qty: 2 }]);
    expect(screen.getByLabelText("Cart")).toHaveTextContent("2");
  });

  it("shows cart lines and total, and changes quantity", async () => {
    const user = userEvent.setup();
    renderAt("/products/2");
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    await user.click(screen.getByLabelText("Cart"));
    expect(screen.getByText("Total: $45")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Increase Ergonomic Mouse"));
    expect(screen.getByText("Total: $90")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Remove Ergonomic Mouse"));
    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
  });

  it("redirects checkout to login, then back after login", async () => {
    const user = userEvent.setup();
    const { router } = renderAt("/products/1");
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    await user.click(screen.getByLabelText("Cart"));
    await user.click(screen.getByRole("link", { name: "Checkout" }));
    expect(router.state.location.pathname).toBe("/login");
    await user.type(screen.getByLabelText("Name"), "Sam");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(router.state.location.pathname).toBe("/checkout");
    expect(screen.getByText("Hi, Sam")).toBeInTheDocument();
  });

  it("places an order, clears the cart and redirects with a message", async () => {
    const user = userEvent.setup();
    const { router, store } = renderAt("/products/1");
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    await user.click(screen.getByLabelText("Cart"));
    await user.click(screen.getByRole("link", { name: "Checkout" }));
    await user.type(screen.getByLabelText("Name"), "Sam");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    await user.click(screen.getByRole("button", { name: "Place order" }));
    expect(router.state.location.pathname).toBe("/products");
    expect(store.getState().cart.items).toEqual([]);
    expect(screen.getByText("Order placed")).toBeInTheDocument();
  });

  it("sends an empty cart away from checkout", async () => {
    const user = userEvent.setup();
    const { router } = renderAt("/login");
    await user.type(screen.getByLabelText("Name"), "Sam");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(router.state.location.pathname).toBe("/products");
    await act(() => router.navigate("/checkout"));
    expect(await screen.findByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
  });

  it("logs out and returns to products", async () => {
    const user = userEvent.setup();
    const { router, store } = renderAt("/login");
    await user.type(screen.getByLabelText("Name"), "Sam");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    await user.click(screen.getByRole("button", { name: "Log out" }));
    expect(store.getState().auth.user).toBeNull();
    expect(router.state.location.pathname).toBe("/products");
  });
});
