import { RouteObject, useRoutes } from 'react-router-dom';
import { withBookCategory } from '~/hoc/with-book-category';

import { withContainer } from '~/hoc/with-container';
import { withShell } from '~/hoc/with-shell';
import BookListByCategory from '~/pages/book-list-by-category';
import MainPage from '~/pages/main';
import NotFoundPage from '~/pages/not-found';

// route list
const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/categories/:categoryId/books',
    element: <BookListByCategory />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default withBookCategory(withShell(withContainer(Routes)));
