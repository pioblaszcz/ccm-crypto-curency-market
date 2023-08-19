import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';

import { setPrices } from './redux/actions/appActions';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import Prices from './pages/Prices';

const requestUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cbnb%2Cethereum%2Ctether%2Cxrp%2Ccardano%2Cdogecoin%2Csolana%2Ctron%2Clitecoin%2Chedera&vs_currencies=usd&include_market_cap=false&include_24hr_change=true';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPrices = () => fetch(requestUrl, { method: 'GET' })
      .then(resp => resp.json())
      .then(prices => dispatch(setPrices(prices)))
    fetchPrices();
    const interval = setInterval(fetchPrices, 250000);
    return () => clearInterval(interval);
  })


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/prices' element={<Prices />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}

const Root = () => {

  return <>
    <Navigation />
    <Outlet />
  </>
}

export default App;
