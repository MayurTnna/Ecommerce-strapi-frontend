import Product from "./Product/Product";
import "./Products.scss";
const Products = ({ products, innerPage, headingText }) => {
  return (
    <>
      <div className="products-container">
        {!innerPage ? <div className="sec-heading">{headingText}</div> : ""}
        <div className="products container mx-auto">
          <div className="row    text-center">
            {/* {console.log(products)} */}
            {products && products.data
              ? products.data.map((item) => (
                  <div className="mx-auto col-lg-3  col-xxl-3 col-md-6">
                    <Product
                      key={item.id}
                      id={item.id}
                      data={item.attributes}
                    />
                  </div>
                ))
              : "not found"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
