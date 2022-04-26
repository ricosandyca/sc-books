import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getBooksByCategory } from '~/services/book';
import {
  bookCategoryIdState,
  bookListPageState,
  bookListState,
} from '~/store/book';

export const DEFAULT_BOOK_LIST_SIZE = 10;

export function useBookListAction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const categoryId = useRecoilValue(bookCategoryIdState);
  const bookListPage = useRecoilValue(bookListPageState);
  const [books, setBooks] = useRecoilState(bookListState(categoryId ?? 0));

  const loadMoreBooks = useCallback(async () => {
    if (!categoryId) return;
    try {
      setIsLoading(true);
      setError(null);
      const newBooks = await getBooksByCategory(
        categoryId,
        bookListPage,
        DEFAULT_BOOK_LIST_SIZE,
      );
      setBooks((books) => [...books, ...newBooks]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, bookListPage]);

  return { books, loadMoreBooks, isLoading, error };
}
