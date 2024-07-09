import React, { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../../utils/apiCall";
import { Product } from "../../common/types";
import ProductsCard from "../../components/ProductCard";
import { useOutletContext } from "react-router-dom";

interface CartProductContext {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<any>>
}

const Home: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const { cartProducts, setCartProducts } = useOutletContext<CartProductContext>();

  console.log({cartProducts})

  useEffect(() => {
    (async () => {
      try {
        const productsList = await fetchProducts();
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const addToCartHandler = useCallback((productDetails: Product): void => {
    setCartProducts((allProducts: Product[]) => [
      ...allProducts,
      {...productDetails, quantity: 1}
    ])
  }, [])

  console.log({ products });

  return (
    <div className="product-items">
      {products.map((product) => (
        <ProductsCard key={product.id} productDetails={product} addToCart={addToCartHandler} />
      ))}
    </div>
  );
};

export default Home;
