import { useContext } from "react";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import "./Home.scss";

import AppContext, { Context } from "../../utils/context";


const Home = () => {
  const { categories, products } = useContext(Context);
  // console.log(cartItems.length , "total items:-");

  return (
    <>
      <>
        <Banner />
        <div className="main-content">
          <div className="layout">
            <Category categories={categories} />
            {/* <AppContext /> */}
            <Products headingText="Popular Products" products={products} />
          </div>
        </div>
      </>
    </>
  );
};

export default Home;
