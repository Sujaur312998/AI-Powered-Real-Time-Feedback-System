import { useRoutes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage'
import Customer from './components/adminComponent/customer'
import Navbar from './components/NavBar/';
import Home from './components/Home/';
import Product from './components/adminComponent/customerComponent/Product';
import ProductDetails from './components/adminComponent/customerComponent/productDetails'

export default function App() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/customer', element: <Customer /> },
    { path: '/products', element: <Product /> },
    { path: '/productdetails/:id', element: <ProductDetails /> },

    { path: '*', element: <NotFoundPage /> },
  ];

  const element = useRoutes(routes);

  return (
    <div className="w-full flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {element}
        </main>
      </div>

  );
}