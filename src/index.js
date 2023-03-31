// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import BookInfo from './components/BookInfo';
import { Cart } from './components/Cart';
import { Order } from './components/Order';
import { Provider } from 'react-redux';
import store from './store';
import WishList from './components/WishList';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/book',
    element: <BookInfo />
  },
  {
    path:'/cart',
    element: <Cart />
  },
  {
    path:'/order',
    element: <Order />
  },
  {
    path:'/wishlist',
    element: <WishList />
  },
]);
root.render(
  <Provider store={store}>   
  <RouterProvider router={router} />
  </Provider>
);

