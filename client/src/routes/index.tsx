import { RouteObject, useRoutes } from 'react-router-dom';

import NotFoundPage from '~/pages/not-found';

// route list
const routes: RouteObject[] = [
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default Routes;
