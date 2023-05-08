import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Profile,
  ChatPage,
  LiveStock,
  UserProfile,
  Order,
  ToReceiveItem,
  Dashboard,
  AccountMgt,
  PostMgt,
  ChatMgt,
  RatingFeedbacks,
  NotificationMgt,
  PurchaseHistory,
  Invoice
} from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/message" element={<ChatPage />} />
        <Route path="/livestocks" element={<LiveStock />} />
        <Route path="/UserProfile/:id" element={<UserProfile />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Invoice/:id" element={<Invoice/>} />
        <Route path="/AccountManagement" element={<AccountMgt />} />
        <Route path="/PostManagement" element={<PostMgt />} />
        <Route path="/ChatManagement" element={<ChatMgt />} />
        <Route path="/RatingsAndFeedbacks" element={<RatingFeedbacks />} />
        <Route path="/NotificationManagement" element={<NotificationMgt />} />
        <Route path="/PurchaseHistory" element={<PurchaseHistory />} />
        <Route path="/ToReceiveItem" element={<ToReceiveItem />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
