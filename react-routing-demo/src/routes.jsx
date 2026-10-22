import { Navigate } from "react-router-dom";
import Root from "./components/Root";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const routes = [
  {
    element: <Root />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/about", element: <About /> },
          { path: "/home", element: <Navigate to="/" replace /> },
          { path: "/products", element: <Products /> },
          { path: "/products/:id", element: <ProductDetail /> },
          { path: "/login", element: <Login /> },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/dashboard",
                element: <Dashboard />,
                children: [
                  { index: true, element: <DashboardHome /> },
                  { path: "profile", element: <Profile /> },
                  { path: "settings", element: <Settings /> }
                ]
              }
            ]
          },
          { path: "*", element: <NotFound /> }
        ]
      }
    ]
  }
];

export default routes;
