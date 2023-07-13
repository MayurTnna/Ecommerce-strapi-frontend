import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Category from "../components/Category/Category";
import SingleProduct from "../components/SingleProduct/SingleProduct";
import Cart from "../components/Cart/Cart";
import Footer from "../components/Footer/Footer";

const RouterPaths = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/draw" element={<Cart />} />

        <Route path="/about" element={<Footer />} />
      </Routes>
    </>
  );
};

export default RouterPaths;
