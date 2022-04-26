import { Box, SimpleGrid } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { Book } from '~/types/book';
import BookItem from './BookItem';

export type BookListProps = {
  books: Book[];
};

const BookList: FC<BookListProps> = ({ books }) => {
  return (
    <Box>
      <SimpleGrid columns={[2, 3, 4, 4, 5]} spacing={[6, 6, 8, null]}>
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default memo(BookList);
