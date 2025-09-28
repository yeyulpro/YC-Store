import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import ContactPage from "../../features/contact/ContactPage";

import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [{ path: "checkout", element: <CheckoutPage /> }],
      },
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginForm /> },
      { path: "account/register", element: <RegisterForm /> },
      { path: "contact", element: <ContactPage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "basket", element: <BasketPage /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);
