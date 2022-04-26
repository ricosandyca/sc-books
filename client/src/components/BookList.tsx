import { VStack } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { Book } from '~/types/book';
import BookItem from './BookItem';

export type BookListProps = {
  books: Book[];
};

const BookList: FC<BookListProps> = ({ books }) => {
  return (
    <VStack>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </VStack>
  );
};

export default memo(BookList);
