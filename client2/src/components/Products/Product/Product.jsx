import "./Product.scss";
import star from "../../../assets/star/star.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../../utils/context";
import { Circles } from "react-loader-spinner";
import { FaCartPlus } from "react-icons/fa";
import { Image, Shimmer } from "react-shimmer";
const Product = ({ id, data }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const { handleAddToCart } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="product-card-container"
        onClick={() => navigate("/product/" + id)}
      >
        <span className="product-image-text">
          <Image
            className="product-image"
            src={
              process.env.REACT_APP_DEV_URL + data.img.data[0].attributes.url
            }
            fallback={<Shimmer width={800} height={600} />}
            alt="dhdsh"
          />

          <span className="discount-text">
            {data.price - (data.price * id) / data.price}%OFF
          </span>
        </span>
        <div className="mt-4 px-3 pb-3">
          <span>
            <h5 className="product-title">{data.title}</h5>
          </span>
          <div className="price-container">
            <p className="mb-0">
              <span className="discounted-price">₹{data.price}</span>
              <span className="orignal-price">₹{data.price * id} </span>
            </p>
            <div className="d-flex align-items-center ">
              <div className="">
                <img src={star} alt="star" />
              </div>
              <div className="">
                <img src={star} alt="star" />
              </div>
              <div className="">
                <img src={star} alt="star" />
              </div>
              <div className="">
                <img src={star} alt="star" />
              </div>
              <div className="">
                <img src={star} alt="star" />
              </div>
              <span className="star-number">5.0</span>
            </div>
          </div>
          <button
            onClick={() => {
              let quantity = 1;

              setLoader(true);
              setTimeout(() => {
                setLoader(false);
              }, [3000]);
            }}
            className="add-to-cart-btn"
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
    </>
  );
};

export default Product;
