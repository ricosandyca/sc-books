import { RouteObject, useRoutes } from 'react-router-dom';

import { withBookCategory } from '~/hoc/with-book-category';
import { withBookModal } from '~/hoc/with-book-modal';
import { withShell } from '~/hoc/with-shell';
import BookListByCategory from '~/pages/book-list-by-category';
import Bookmark from '~/pages/bookmark';
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
    path: '/bookmark',
    element: <Bookmark />,
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

//
export default withBookCategory(
  // to always retrieve categories data from API
  withShell(
    // wrapped with app shell contains app bar
    withBookModal(
      // to globally access single book modal data
      Routes,
    ),
  ),
);
