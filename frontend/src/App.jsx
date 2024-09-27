import { useRoutes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import Home from './components/Home';
import Product from './components/Product';
import ProductDetails from './components/productDetails';
import Order from './components/Order';
import ReviewCharts from './components/Analysis';
import Customer from './components/Customer';
import Navbar from './components/NavBar';

export default function App() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/customer', element: <Customer /> },
    { path: '/products', element: <Product /> },
    { path: '/productdetails/:p_id', element: <ProductDetails /> },
    { path: '/productdetails/:p_id/:o_id', element: <ProductDetails /> },
    { path: '/analysis', element: <ReviewCharts /> },
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