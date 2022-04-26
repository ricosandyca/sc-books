import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getBooksByCategory } from '~/services/book';
import { bookListPaginationState, bookListState } from '~/store/book';

export function useBookListAction(categoryId: number, initFirstPage: boolean) {
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useRecoilState(bookListState(categoryId));
  const [pagination, setPagination] = useRecoilState(
    bookListPaginationState(categoryId),
  );

  const loadMoreBooks = useCallback(async () => {
    try {
      setPagination((p) => ({ ...p, isLoading: true }));
      setError(null);
      const newBooks = await getBooksByCategory(
        categoryId,
        pagination.page,
        pagination.itemsPerPage,
      );
      setBooks((books) => [...books, ...newBooks]);
      setPagination((p) => ({
        ...p,
        page: p.page + 1,
        hasNextPage: newBooks.length >= pagination.itemsPerPage,
      }));
    } catch (err: any) {
      if (books.length <= 0) return setError(err.message);
      setPagination((p) => ({ ...p, hasNextPage: false }));
    } finally {
      setPagination((p) => ({ ...p, isLoading: false }));
    }
  }, [categoryId, pagination, books]);

  useEffect(() => {
    // only init books data if the page is zero
    if (initFirstPage) if (pagination.page <= 0) loadMoreBooks();
  }, [initFirstPage, pagination.page]);

  return { books, loadMoreBooks, pagination, error };
}
