import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Root from '../Root';
import NotFound from './NotFound';
import ErrorComponent from '../components/ErrorComponent';
import User from './users/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home />, errorElement: <ErrorComponent /> },
      { path: 'About', element: <About /> },
      { path: '/users/:userId', element: <User />, errorElement: <NotFound /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
