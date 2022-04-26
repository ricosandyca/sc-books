import { RouteObject, useRoutes } from 'react-router-dom';
import { withContainer } from '~/hoc/with-container';
import { withShell } from '~/hoc/with-shell';

import NotFoundPage from '~/pages/not-found';

// route list
const routes: RouteObject[] = [
  {
    path: '*',
    element: <NotFoundPage h="calc(100vh - 190px)" />,
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default withShell(withContainer(Routes));
