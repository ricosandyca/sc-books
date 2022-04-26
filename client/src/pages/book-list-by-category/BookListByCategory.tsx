import { Button, Heading, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import BookList from '~/components/BookList';
import BookListSkeleton from '~/components/BookListSkeleton';
import CategoryList from '~/components/CategoryList';
import { withContainer } from '~/hoc/with-container';
import { useBookListAction } from '~/hooks/use-book';
import { useDocumentTitle } from '~/hooks/use-document-title';
import NotFoundPage from '~/pages/not-found';
import { selectedCategoryState } from '~/store/category';

const BookListByCategory: FC = () => {
  const { categoryId } = useParams();
  const selectedCategory = useRecoilValue(selectedCategoryState(+categoryId!));
  const { loadMoreBooks, books, pagination, error } = useBookListAction(
    +categoryId!,
    true,
  );

  // change title
  useDocumentTitle(selectedCategory?.name);

  if (error) return <NotFoundPage />;

  return (
    <VStack spacing={12}>
      {/* Book list */}
      <VStack w="full" align="flex-start" spacing={6}>
        {/* Category title */}
        <Heading as="h2" fontSize="2xl">
          {selectedCategory?.name}
        </Heading>

        {/* Category selection */}
        <CategoryList selectedCategoryId={+categoryId!} />

        {/* Book list section */}
        <VStack w="full" spacing={[6, 6, 8, null]}>
          {books.length > 0 && <BookList books={books} />}
          {pagination.isLoading && <BookListSkeleton noOfSkeletons={10} />}
        </VStack>
      </VStack>

      {/* Load more button */}
      {pagination.hasNextPage && (
        <Button
          variant="outline"
          onClick={loadMoreBooks}
          isLoading={pagination.isLoading}
        >
          Load More Books
        </Button>
      )}
    </VStack>
  );
};

export default withContainer(BookListByCategory);
