import "./SingleProduct.scss";

import { Circles } from "react-loader-spinner";
import {
  FaCartPlus,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useContext, useState } from "react";
import Cart from "../Cart/Cart";
import UseFetch from "../../hooks/UseFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../utils/context";

const SingleProduct = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loader, setLoader] = useState(false);

  const { handleAddToCart } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = UseFetch(`/api/products?populate=*&[filters][id]=${id}`);
  const product = data && data?.data[0]?.attributes;

  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else setQuantity(quantity - 1);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen({ ...isDrawerOpen, [anchor]: open });
  };

  return (
    <>
      {product && product.img.data[0].attributes.url ? (
        <div className="single-product-main-content">
          <div className="layout">
            <div className="single-product-page">
              <div className="left mx-auto ">
                <img
                  src={
                    process.env.REACT_APP_DEV_URL +
                    product.img.data[0].attributes?.url
                  }
                  alt="prod1"
                />
              </div>
              <div className="right">
                <span className="name">{product.title}</span>
                <span className="price">{product.price}</span>
                <span className="description">{product.desc}</span>
                <div className="cart-buttons">
                  <div className="quantity-buttons">
                    <span onClick={decrement}>-</span>
                    <span>{quantity}</span>
                    <span onClick={increment}>+</span>
                  </div>
                  <div className="button-container">
                    <button
                      onClick={() => {
                        handleAddToCart(data.data[0], quantity);
                        toggleDrawer("right", true);
                        setLoader(true);
                        setTimeout(() => {
                          setIsDrawerOpen(true);
                          setLoader(false);
                        }, [1000]);
                        setQuantity(1);
                      }}
                      className="add-to-cart-button"
                    >
                      {!loader ? (
                        <>
                          <FaCartPlus /> &nbsp; Add to Cart
                        </>
                      ) : (
                        <Circles
                          height="30"
                          width="80"
                          color="white"
                          ariaLabel="circles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        />
                      )}
                    </button>
                  </div>
                </div>
                <hr className="divider" />
                <div className="info-item">
                  <span className="text-bold">
                    Categories:&nbsp;
                    <span>{product.categories.data[0].attributes.title}</span>
                  </span>
                  <span className="text-bold d-flex align-items-center">
                    Share:
                    <span className="social-icons">
                      <FaFacebookF size={16} />
                      <FaTwitter size={16} />
                      <FaInstagram size={16} />
                      <FaLinkedin size={16} />
                      <FaPinterest size={16} />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <RelatedProducts
              productId={id}
              categoryId={product.categories.data[0].id}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {isDrawerOpen ? (
        <Cart isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      ) : (
        ""
      )}
    </>
  );
};

export default SingleProduct;
