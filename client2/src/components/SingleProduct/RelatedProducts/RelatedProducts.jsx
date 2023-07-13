import UseFetch from "../../../hooks/UseFetch";
import Products from "../../Products/Products";

const RelatedProducts = ({ productId, categoryId }) => {
  const { data } = UseFetch(
    `/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
  );
  return (
    <div className="related-products">
      <Products headingText="Related Products" products={data} />
    </div>
  );
};

export default RelatedProducts;
