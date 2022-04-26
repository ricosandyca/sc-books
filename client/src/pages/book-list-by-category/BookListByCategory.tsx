import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BookList from '~/components/BookList';
import { useBookListAction } from '~/hooks/use-book';
import NotFoundPage from '~/pages/not-found';

const BookListByCategory: FC = () => {
  const { categoryId } = useParams();
  const { loadMoreBooks, books, error } = useBookListAction(+categoryId!);

  useEffect(() => {
    loadMoreBooks().then();
  }, []);

  if (error) return <NotFoundPage />;

  return <BookList books={books} />;
};

export default BookListByCategory;
