import { Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/products" replace /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/checkout", element: <Checkout /> }]
      },
      { path: "*", element: <NotFound /> }
    ]
  }
];

export default routes;
