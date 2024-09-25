import Navbar from './components/navbar/navbar'
import { useRoutes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import Customer from './components/adminComponent/customer'


export default function App() {
  const routes = [
    { path: '/', element: <Customer /> },
    // { path: '/create_group', element:<CreateGroup header='Create Font Group'/>  },
    // { path: '/update_group', element:<CreateGroup header='Update Font Group'/>  },
    // { path: '/font_groups', element: <FontGroup /> },
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