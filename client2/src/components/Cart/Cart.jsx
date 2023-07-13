import { Box, Typography, IconButton, Drawer } from "@mui/material";
import "./Cart.scss";
import { ImCross } from "react-icons/im";
import React, { useContext, useState, useEffect } from "react";
import emptyBag from "../../assets/emptyBag/empptyBag.png";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/context";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";

const Cart = ({ setIsDrawerOpen, isDrawerOpen }) => {
  const [animate, setAnimate] = useState(false);
  const { cartItems, cartSubTotal } = useContext(Context);

  useEffect(() => {
    if (isDrawerOpen) {
      setAnimate(true);
    }
  }, [isDrawerOpen]);

  const handleDrawerClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 300); // Delay the closing of the drawer to allow the animation to complete
  };
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("api/orders", {
        products: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res?.data?.stripeSession.id || "",
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
        className="mx-auto"
      />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        className={animate ? "slide-in" : "slide-out"} // Apply slide-in or slide-out animation classes
        transitionDuration={300} // Set the duration of the sliding animation
        transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)" // Set the timing function for the animation
        // hideBackdrop
      >
        <Box
          p={2}
          width="300px"
          textAlign="left"
          role="presentation"
          className="anime-drawer"
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography variant="h6" component="div">
              Your cart
            </Typography>

            <div className="cross-button" onClick={handleDrawerClose}>
              <ImCross />
            </div>
          </div>
        </Box>

        {!cartItems?.length ? (
          <div className="empty-image-text">
            <img src={emptyBag} alt="empty" className="img-main" />
            <div className="empty-text">Your cart is feeling lonely:( </div>
            <div className="mt-3">
              <Link to="/">
                <button className="shop-button" onClick={handleDrawerClose}>
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <CartItem cartItems={cartItems} id={cartItems.id} />
        )}

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span className="text">Subtotal:</span>
              <span className="text total">&#8377; {cartSubTotal}</span>
            </div>
            <div className="button">
              <button className="checkout-cta" onClick={handlePayment}>
                Confirm order
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Cart;
