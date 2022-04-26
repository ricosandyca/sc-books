import { Image } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { Book } from '~/types/book';

export type BookItemProps = {
  book: Book;
};

const BookItem: FC<BookItemProps> = ({ book }) => {
  return <Image src={book.cover_url} />;
};

export default memo(BookItem);
