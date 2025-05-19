import React from "react";
import AllProducts from "@/screens/AllProducts";
import Dashboard from "@/screens/Dashboard";
import Login from "@/screens/Login";
import Product from "@/screens/Product";
import Profile from "@/screens/Profile";
import ShoppingCart from "@/screens/ShoppingCart";
import Signup from "@/screens/Signup";
import Wishlist from "@/screens/Wishlist";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Signup/>
    </Provider>
  );
}