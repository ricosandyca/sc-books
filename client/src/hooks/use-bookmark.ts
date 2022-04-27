import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { bookmarkedListState } from '~/store/book';
import { Book } from '~/types/book';

export function useBookmarkAction(bookId: number) {
  const [bookmarkedBooks, setBookmarkedBooks] =
    useRecoilState(bookmarkedListState);

  const isBookmarked = useMemo(() => {
    return !!bookmarkedBooks.find(({ id }) => id === bookId);
  }, [bookmarkedBooks, bookId]);

  const handleToggleBookmark = useCallback(
    (book: Book) => {
      // if the book is bookmarked already
      // remove from the list
      if (isBookmarked)
        return setBookmarkedBooks((books) =>
          books.filter(({ id }) => id !== bookId),
        );
      // otherwise, add the book to the list
      setBookmarkedBooks((books) => [book, ...books]);
    },
    [isBookmarked, bookId],
  );

  return { isBookmarked, handleToggleBookmark };
}
