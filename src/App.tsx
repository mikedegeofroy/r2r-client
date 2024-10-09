import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home.page';
import { SettingsPage } from './pages/settings.page';
import { ResultPage } from './pages/result.page';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/settings',
      element: <SettingsPage />,
    },
    {
      path: '/result',
      element: <ResultPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
