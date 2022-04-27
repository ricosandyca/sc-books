import { Heading, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import BookList from '~/components/BookList';
import { withContainer } from '~/hoc/with-container';
import { useDocumentTitle } from '~/hooks/use-document-title';
import { bookmarkedListState } from '~/store/book';

const Bookmark: FC = () => {
  const books = useRecoilValue(bookmarkedListState);

  // change document title
  useDocumentTitle('My Bookmark');

  return (
    <VStack spacing={12} w="full" align="flex-start">
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
