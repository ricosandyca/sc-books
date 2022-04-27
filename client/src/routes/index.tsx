import { RouteObject, useRoutes } from 'react-router-dom';
import { withBookCategory } from '~/hoc/with-book-category';

import { withShell } from '~/hoc/with-shell';
import BookDetail from '~/pages/book-detail';
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
    path: '/books/:bookId',
    element: <BookDetail />,
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

export default withBookCategory(withShell(Routes));
