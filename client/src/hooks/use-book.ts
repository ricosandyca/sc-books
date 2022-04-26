import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getBooksByCategory } from '~/services/book';
import { bookListState } from '~/store/book';

export const DEFAULT_BOOK_LIST_SIZE = 10;

export function useBookListAction(categoryId: number, initFirstPage: boolean) {
  const [isLoading, setIsLoading] = useState(initFirstPage);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(0);
  const [books, setBooks] = useRecoilState(bookListState);

  const loadMoreBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const newBooks = await getBooksByCategory(
        categoryId,
        page,
        DEFAULT_BOOK_LIST_SIZE,
      );
      console.log(newBooks);
      if (newBooks.length < DEFAULT_BOOK_LIST_SIZE) setHasNextPage(false);
      setBooks((books) => [...books, ...newBooks]);
      setPage((page) => ++page);
    } catch (err: any) {
      if (books.length <= 0) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, page, books]);

  useEffect(() => {
    if (initFirstPage) loadMoreBooks();
  }, [initFirstPage, categoryId]);

  return { books, loadMoreBooks, hasNextPage, isLoading, error };
}
