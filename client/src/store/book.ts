import { atom, atomFamily, selectorFamily } from 'recoil';

import { Book, BookPagination } from '~/types/book';
import { persistentEffect } from './effects/persistent-effect';

export const bookListState = atomFamily<Book[], number>({
  key: 'bookListState',
  default: [],
});

export const bookListPaginationState = atomFamily<BookPagination, number>({
  key: 'bookListPaginationState',
  default: {
    page: 0,
    hasNextPage: true,
    itemsPerPage: 10, // default items per page
    isLoading: false,
  },
});

export const bookmarkedListState = atom<Book[]>({
  key: 'bookmarkedListState',
  default: [],
  effects: [persistentEffect('bookmarkedListState')],
});

export const bookSearchKeywordState = atom<string>({
  key: 'bookSearchKeywordState',
  default: '',
});

export const filteredBookListState = selectorFamily<Book[], number>({
  key: 'filteredBookListState',
  get:
    (categoryId) =>
    ({ get }) => {
      const books = get(bookListState(categoryId));
      const searchKeyword = get(bookSearchKeywordState);

      if (!searchKeyword.trim()) return books;

      // filter books by keyword
      const keys = searchKeyword
        .trim()
        .toLowerCase()
        .split(/[^0-9a-z]/gi);

      return books.filter((book) => {
        const authorsStr = book.authors.join(' ').toLowerCase();
        const title = book.title.toLowerCase();

        return keys.some(
          (key) => title.includes(key) || authorsStr.includes(key),
        );
      });
    },
});
