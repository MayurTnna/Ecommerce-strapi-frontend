  import { createContext, useEffect, useState } from "react";
  import { fetchDataFromApi } from "./api";
  import { useLocation } from "react-router-dom";

  export const Context = createContext();

  const AppContext = ({ children }) => {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const location = useLocation();

    useEffect(() => {
      let subTotal = 0;
      cartItems.map(
        (item) => (subTotal += item.attributes.price * item.attributes.quantity)
      );
      setCartSubTotal(subTotal);
    }, [cartItems]);

    const handleAddToCart = (product, quantity) => {
      let items = [...cartItems];
      let index = items.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        items[index].attributes.quantity += quantity;
      } else {
        product.attributes.quantity = quantity;
        items = [...items, product];
      }
      setCartItems(items);
      // console.log(cartItems)
    };
    const handleRemoveFromCart = (product) => {
      let items = [...cartItems];
      items = items.filter((p) => p.id === product.id);
      console.log("hello");
      setCartItems(items);
    };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    const handleCartProductQuantity = (type, product) => {
      let items = [...cartItems];
      let index = items.findIndex((p) => p.id === product.id);

      if (type === "inc") {
        items[index].attributes.quantity++;
      } else if (type === "dec") {
        if (items[index].attributes.quantity <= 1) {
          // Remove the item from cart if its quantity becomes less than 1
          items.splice(index, 1);
        } else {
          items[index].attributes.quantity--;
        }
      }

      setCartItems(items);
    };

    //fetching data Category wise
    useEffect(() => {
      getCategories();
    }, []);
    const getCategories = () => {
      fetchDataFromApi("/api/categories?populate=*").then((result) => {
        // console.log(result);
        setCategories(result);
      });

      // console.log(categories);
    };

    //fetching from API product wise
    useEffect(() => {
      getProducts();
    }, []);

    const getProducts = () => {
      fetchDataFromApi("/api/products?populate=*").then((res) => {
        // console.log(res);
        setProducts(res);
        // console.log(setProducts(res));
      });
    };

    return (
      <Context.Provider
        value={{
          categories,
          setCategories,
          products,
          setProducts,
          cartItems,
          setCartItems,
          cartCount,
          setCartCount,
          cartSubTotal,
          setCartSubTotal,
          handleAddToCart,
          handleRemoveFromCart,
          handleCartProductQuantity,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  export default AppContext;
