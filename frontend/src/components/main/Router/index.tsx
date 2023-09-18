import {
  createBrowserRouter, RouteObject, RouterProvider,
} from 'react-router-dom';
import {
  Dashboard, Profile, SignIn, SignUp,
} from 'components/content';
import { routsPatterns } from 'resources/constants';
import PageNoteFound from 'components/main/PageNoteFound';
import AppTemplate from 'components/main/Template';

function Router() {
  const routObjects: RouteObject[] = [
    {
      path: routsPatterns.DASHBOARD,
      element: <AppTemplate />,
      errorElement: <PageNoteFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: routsPatterns.PROFILE,
          element: <Profile />,
        },
      ],
    },
    {
      path: routsPatterns.SIGN_IN,
      element: <SignIn />,
    },
    {
      path: routsPatterns.SIGN_UP,
      element: <SignUp />,
    },
  ];
  const router = createBrowserRouter(routObjects);
  return (
    <RouterProvider router={router} />
  );
}

export default Router;
