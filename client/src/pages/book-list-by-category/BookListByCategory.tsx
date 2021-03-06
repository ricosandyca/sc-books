import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import BookList from '~/components/BookList';
import BookListSkeleton from '~/components/BookListSkeleton';
import CategoryList from '~/components/CategoryList';
import SearchBookInput from '~/components/SearchBookInput';
import { withContainer } from '~/hoc/with-container';
import { useBookListAction } from '~/hooks/use-book';
import { useDocumentTitle } from '~/hooks/use-document-title';
import NotFoundPage from '~/pages/not-found';
import { selectedCategoryState } from '~/store/category';

const BookListByCategory: FC = () => {
  const { categoryId } = useParams();
  const selectedCategory = useRecoilValue(selectedCategoryState(+categoryId!));
  const { loadMoreBooks, filteredBooks, pagination, error } = useBookListAction(
    +categoryId!,
    true,
  );

  // change title
  useDocumentTitle(selectedCategory?.name);

  if (error) return <NotFoundPage />;

  return (
    <VStack spacing={6} align="flex-start">
      {/* Category title */}
      <Heading as="h2" fontSize={['xl', null, null, '2xl']}>
        {selectedCategory?.name}
      </Heading>

      {/* Category selection */}
      <CategoryList selectedCategoryId={+categoryId!} />

      {/* Search books input */}
      <SearchBookInput />

      {/* Book list section */}
      <VStack w="full" spacing={[6, 6, 8, null]}>
        {filteredBooks.length > 0 && <BookList books={filteredBooks} />}
        {pagination.isLoading && <BookListSkeleton noOfSkeletons={10} />}
      </VStack>

      {/* Load more button */}
      {pagination.hasNextPage && !pagination.isLoading && (
        <Box pt={6} alignSelf="center">
          <Button
            variant="outline"
            onClick={loadMoreBooks}
            isLoading={pagination.isLoading}
          >
            Load more
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default withContainer(BookListByCategory);
