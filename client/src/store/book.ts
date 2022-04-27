import { atom, atomFamily, selectorFamily } from 'recoil';

import { Book, BookPagination } from '~/types/book';
import { normalizeString } from '~/utils/string';
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

export const bookSearchKeywordState = atom<string>({
  key: 'bookSearchKeywordState',
  default: '',
});

// supports special keywords search
// eg. author: John Doe (filter books authored by John Doe only)
export const filteredBookListState = selectorFamily<Book[], number>({
  key: 'filteredBookListState',
  get:
    (categoryId) =>
    ({ get }) => {
      const books = get(bookListState(categoryId));
      const searchKeyword = get(bookSearchKeywordState);

      if (!searchKeyword.trim()) return books;

      // special keywords checking
      const authorSearchingPattern = /^author:/i;
      if (authorSearchingPattern.test(searchKeyword)) {
        const authorName = searchKeyword
          .replace(authorSearchingPattern, '')
          .trim()
          .toLowerCase();
        return books.filter(({ authors }) =>
          authors.some((author) => author.toLowerCase() === authorName),
        );
      }

      // global keywords checking
      // this checks either book authors or book title
      // filter books by keyword
      const keys = normalizeString(searchKeyword).split(/[^0-9a-z]/gi);

      return books.filter((book) => {
        const authorsStr = book.authors.join(' ').toLowerCase();
        const title = book.title.toLowerCase();

        return keys.every(
          (key) =>
            normalizeString(title).includes(key) ||
            normalizeString(authorsStr).includes(key),
        );
      });
    },
});

export const bookmarkedListState = atom<Book[]>({
  key: 'bookmarkedListState',
  default: [],
  effects: [persistentEffect('bookmarkedListState')],
});

export const bookModalState = atom<Book | null>({
  key: 'bookModalState',
  default: null,
});
