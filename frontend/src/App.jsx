import { useRoutes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import Home from './components/Home';
import Product from './components/adminComponent/customerComponent/Product';
import ProductDetails from './components/adminComponent/customerComponent/productDetails'
import Order from './components/adminComponent/customerComponent/Order';
import Analysis from './components/adminComponent/analysis';
import Customer from './components/adminComponent/Customer';
import Navbar from './components/NavBar';

export default function App() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/customer', element: <Customer /> },
    { path: '/products', element: <Product /> },
    { path: '/productdetails/:p_id', element: <ProductDetails /> },
    { path: '/productdetails/:p_id/:o_id', element: <ProductDetails /> },
    { path: '/analysis', element: <Analysis /> },
    { path: '/order', element: <Order /> },
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