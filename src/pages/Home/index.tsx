import React, { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../../utils/apiCall";
import { Product } from "../../common/types";
import ProductsCard from "../../components/ProductCard";
import { useOutletContext } from "react-router-dom";

interface CartProductContext {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<any>>;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartProducts, setCartProducts } =
    useOutletContext<CartProductContext>();

  useEffect(() => {
    (async () => {
      try {
        const productsList = await fetchProducts();
        const modified_list = productsList.map((product) => ({
          ...product,
          quantity: 0,
          originalPrice: product.price,
        }));
        setProducts(modified_list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const addToCartHandler = useCallback((productDetails: Product): void => {
    setCartProducts((allProducts: Product[]) => {
      const isProductPresent = allProducts.filter(
        (products) => products.id === productDetails.id
      );

      if (isProductPresent.length) {
        const modifiedProducts = allProducts.map((product) => {
          if (product.id === productDetails.id) {
            return { ...product, quantity: product.quantity + 1 };
          }
        });
        return modifiedProducts;
      } else {
        return [...allProducts, { ...productDetails, quantity: 1 }];
      }
    });
  }, []);

  console.log({ products });

  return (
    <div className="product-items">
      {products.map((product) => (
        <ProductsCard
          key={product.id}
          productDetails={product}
          addToCart={addToCartHandler}
        />
      ))}
    </div>
  );
};

export default Home;
