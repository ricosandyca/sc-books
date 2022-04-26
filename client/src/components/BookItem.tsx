import { Image, Text, VStack } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { Book } from '~/types/book';

export type BookItemProps = {
  book: Book;
};

const BookItem: FC<BookItemProps> = ({ book }) => {
  return (
    <VStack spacing={4}>
      {/* Book image */}
      <Image
        src={book.cover_url}
        shadow="rgb(0 40 60 / 10%) 0px 20px 25px, rgb(0 127 255 / 4%) 0px 10px 10px"
        rounded="lg"
      />

      {/* Book info */}
      <VStack align="flex-start" w="full" spacing={0.5}>
        <Text fontSize="md" fontWeight="medium" noOfLines={2}>
          {book.title}
        </Text>
        <Text fontSize="sm">{book.authors.join(', ')}</Text>
      </VStack>
    </VStack>
  );
};

export default memo(BookItem);
