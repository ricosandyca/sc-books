import { Image, Text, VStack } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { Book } from '~/types/book';

export type BookItemProps = {
  book: Book;
};

const BookItem: FC<BookItemProps> = ({ book }) => {
  return (
    <VStack>
      {/* Book image */}
      <Image
        src={book.cover_url}
        shadow="rgb(0 127 255 / 10%) 0px 20px 25px, rgb(0 127 255 / 4%) 0px 10px 10px"
        rounded="lg"
      />

      {/* Book info */}
      <VStack align="flex-start" w="full">
        <Text fontSize="md" fontWeight="medium">
          {book.title}
        </Text>
      </VStack>
    </VStack>
  );
};

export default memo(BookItem);
