import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, it, expect } from "vitest";
import routes from "./routes";

function renderAt(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

describe("basic routes", () => {
  it("renders the home page", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { name: "Home Page" })).toBeInTheDocument();
  });

  it("renders the about page", () => {
    renderAt("/about");
    expect(screen.getByRole("heading", { name: "About Page" })).toBeInTheDocument();
  });

  it("redirects /home to /", () => {
    const router = renderAt("/home");
    expect(router.state.location.pathname).toBe("/");
    expect(screen.getByRole("heading", { name: "Home Page" })).toBeInTheDocument();
  });

  it("renders the 404 page for unknown routes", () => {
    renderAt("/does-not-exist");
    expect(screen.getByRole("heading", { name: "404 - Page Not Found" })).toBeInTheDocument();
  });
});

describe("navigation", () => {
  it("navigates using nav links", async () => {
    const user = userEvent.setup();
    const router = renderAt("/");
    await user.click(screen.getByRole("link", { name: "About" }));
    expect(router.state.location.pathname).toBe("/about");
    expect(screen.getByRole("heading", { name: "About Page" })).toBeInTheDocument();
  });

  it("goes back home from the 404 page", async () => {
    const user = userEvent.setup();
    renderAt("/nowhere");
    await user.click(screen.getByRole("link", { name: "Go Home" }));
    expect(screen.getByRole("heading", { name: "Home Page" })).toBeInTheDocument();
  });
});

describe("dynamic routes and search params", () => {
  it("renders a product from the url param", () => {
    renderAt("/products/2");
    expect(screen.getByRole("heading", { name: "Mouse" })).toBeInTheDocument();
    expect(screen.getByText("Price: $25")).toBeInTheDocument();
  });

  it("shows a message for an unknown product", () => {
    renderAt("/products/999");
    expect(screen.getByRole("heading", { name: "Product Not Found" })).toBeInTheDocument();
  });

  it("opens a product detail from the list", async () => {
    const user = userEvent.setup();
    const router = renderAt("/products");
    await user.click(screen.getByRole("link", { name: "Monitor" }));
    expect(router.state.location.pathname).toBe("/products/3");
    expect(screen.getByRole("heading", { name: "Monitor" })).toBeInTheDocument();
  });

  it("filters products using the q search param", () => {
    renderAt("/products?q=key");
    expect(screen.getByRole("link", { name: "Keyboard" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Mouse" })).not.toBeInTheDocument();
  });

  it("updates the url when typing in the search box", async () => {
    const user = userEvent.setup();
    const router = renderAt("/products");
    await user.type(screen.getByLabelText("Search"), "web");
    expect(router.state.location.search).toBe("?q=web");
    expect(screen.getByRole("link", { name: "Webcam" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Keyboard" })).not.toBeInTheDocument();
  });
});

describe("protected routes", () => {
  it("redirects to login when not authenticated", () => {
    const router = renderAt("/dashboard");
    expect(router.state.location.pathname).toBe("/login");
    expect(screen.getByRole("heading", { name: "Login Page" })).toBeInTheDocument();
  });

  it("returns to the requested page after login", async () => {
    const user = userEvent.setup();
    const router = renderAt("/dashboard/settings");
    expect(router.state.location.pathname).toBe("/login");
    await user.click(screen.getByRole("button", { name: "Sign In" }));
    expect(router.state.location.pathname).toBe("/dashboard/settings");
    expect(screen.getByRole("heading", { name: "Settings Page" })).toBeInTheDocument();
  });

  it("goes to the dashboard after a direct login", async () => {
    const user = userEvent.setup();
    const router = renderAt("/login");
    await user.click(screen.getByRole("button", { name: "Sign In" }));
    expect(router.state.location.pathname).toBe("/dashboard");
    expect(screen.getByText("Welcome, Demo User")).toBeInTheDocument();
  });

  it("logs out and returns to the home page", async () => {
    const user = userEvent.setup();
    const router = renderAt("/login");
    await user.click(screen.getByRole("button", { name: "Sign In" }));
    await user.click(screen.getByRole("button", { name: "Logout" }));
    expect(router.state.location.pathname).toBe("/");
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
  });
});

describe("nested routes", () => {
  it("renders nested dashboard pages inside the dashboard layout", async () => {
    const user = userEvent.setup();
    renderAt("/login");
    await user.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.getByRole("heading", { name: "Dashboard Overview" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Profile" }));
    expect(screen.getByRole("heading", { name: "Profile Page" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Settings" }));
    expect(screen.getByRole("heading", { name: "Settings Page" })).toBeInTheDocument();
  });
});
