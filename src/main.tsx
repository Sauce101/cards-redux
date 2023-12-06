import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';
import VideoPoker from './routes/video-poker';
import Dashboard from './routes/dashboard';
import BlackJack from './routes/blackjack';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <Root />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: 'video-poker',
            element: <VideoPoker />,
          },
          {
            path: 'blackjack',
            element: <BlackJack />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
