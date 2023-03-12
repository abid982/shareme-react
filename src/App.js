import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/*',
    element: <Home />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
