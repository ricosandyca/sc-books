import { Box, SimpleGrid } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { Book } from '~/types/book';
import BookItem from './BookItem';

export type BookListProps = {
  books: Book[];
  showCategory?: boolean;
};

const BookList: FC<BookListProps> = ({ books, showCategory }) => {
  return (
    <Box>
      <SimpleGrid columns={[2, 2, 3, 4, 5]} spacing={[6, 6, 8, null]}>
        {books.map((book) => (
          <BookItem key={book.id} book={book} showCategory={showCategory} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default memo(BookList);
