import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../../utils/context";
import { useNavigate, useParams } from "react-router-dom";
const CartItem = ({ cartItems, id }) => {
  const { handleCartProductQuantity, handleRemoveFromCart } =
    useContext(Context);
  // console.log(cartItems);
  var firstThreeWords;

  const navigate = useNavigate();
  return (
    <>
      {cartItems &&
        cartItems.map((item) => (
          <div key={item.id} className="cart-products">
            <div
              className="cart-product"
             
            >
              <div className="img-container">
                <img
                  src={
                    process.env.REACT_APP_DEV_URL +
                    item.attributes.img.data[0].attributes.url
                  }
                  alt="random prod"
                />
              </div>
              <div className="prod-details">
                <span className="name">
                  {item.attributes.title.split(" ").slice(0, 3).join(" ")}
                </span>
                <div onClick={handleRemoveFromCart}>
                  <MdClose className="close-btn ml-5" />
                </div>
                <div className="quantity-buttons">
                  <span onClick={() => handleCartProductQuantity("dec", item)}>
                    -
                  </span>
                  <span>{item.attributes.quantity}</span>
                  <span onClick={() => handleCartProductQuantity("inc", item)}>
                    +
                  </span>
                </div>
                <div className="text">
                  <span>{item.attributes.quantity}</span>
                  <span>x</span>
                  <span>
                    &#8377;{item.attributes.price * item.attributes.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CartItem;
