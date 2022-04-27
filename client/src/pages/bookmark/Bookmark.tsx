import { Heading, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import BookList from '~/components/BookList';
import { withContainer } from '~/hoc/with-container';
import { bookmarkedListState } from '~/store/book';

const Bookmark: FC = () => {
  const books = useRecoilValue(bookmarkedListState);

  return (
    <VStack spacing={12} w="full" align="flex-start" minH="40vh">
      <Heading as="h2" fontSize={['xl', null, null, '2xl']}>
        My Bookmark
      </Heading>
      {books.length > 0 ? (
        <BookList books={books} showCategory />
      ) : (
        <Text>No books found</Text>
      )}
    </VStack>
  );
};

export default withContainer(Bookmark);
