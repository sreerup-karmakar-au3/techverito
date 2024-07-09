import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Product } from './common/types';
import './App.css';

const App: React.FC = () => {
  
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [totalCartProducts, setTotalCartProducts] = useState<number>(0);

  useEffect(() => {
    let total = 0
    for(let product of cartProducts) {
      total = total + (product.quantity || 0)
    }

    setTotalCartProducts(total)

  }, [JSON.stringify(cartProducts)])

  return (
    <>
      <Header totalCartProducts={totalCartProducts} />
      <main>
        <Outlet context={{cartProducts, setCartProducts}} />
      </main>
    </>
  );
}

export default App;