import { atom, atomFamily, selector } from 'recoil';

import { Book } from '~/types/book';
import { persistentEffect } from './effects/persistent-effect';

export const bookListState = atomFamily<Book[], number>({
  key: 'bookListState',
  default: [],
});

export const bookCategoryIdState = atom<number | null>({
  key: 'bookCategoryIdState',
  default: null,
});

export const bookListPageState = atom<number>({
  key: 'bookListPageState',
  default: 0,
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

export const filteredBookListState = selector<Book[]>({
  key: 'filteredBookListState',
  get: ({ get }) => {
    const bookCategoryId = get(bookCategoryIdState);
    const books = get(bookListState(bookCategoryId ?? 0));
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
