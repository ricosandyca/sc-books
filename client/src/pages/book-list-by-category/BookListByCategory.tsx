import { Button, Heading, VStack } from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import BookList from '~/components/BookList';
import BookListSkeleton from '~/components/BookListSkeleton';
import CategoryList from '~/components/CategoryList';
import { withContainer } from '~/hoc/with-container';
import { useBookListAction } from '~/hooks/use-book';
import { useDocumentTitle } from '~/hooks/use-document-title';
import NotFoundPage from '~/pages/not-found';
import { categoryListState } from '~/store/category';

const BookListByCategory: FC = () => {
  const { categoryId } = useParams();
  const categories = useRecoilValue(categoryListState);
  const { loadMoreBooks, books, hasNextPage, isLoading, error } =
    useBookListAction(+categoryId!);

  // get selected category detail
  const selectedCategory = useMemo(() => {
    return categories.find(
      ({ id }) => id.toString() === categoryId?.toString(),
    );
  }, [categories, categoryId]);

  // init book data
  useEffect(() => {
    loadMoreBooks().then();
  }, []);

  // change title
  useDocumentTitle(selectedCategory?.name);

  if (error) return <NotFoundPage />;

  return (
    <VStack spacing={14}>
      {/* Category selection */}
      <CategoryList />

      {/* Book list */}
      <VStack w="full" align="flex-start" spacing={6}>
        <Heading as="h2" fontSize="2xl">
          {selectedCategory?.name}
        </Heading>
        <VStack spacing={[6, 6, 8, null]}>
          <BookList books={books} />
          {isLoading && <BookListSkeleton noOfSkeletons={10} />}
        </VStack>
      </VStack>

      {/* Load more button */}
      {hasNextPage && (
        <Button variant="outline" onClick={loadMoreBooks} isLoading={isLoading}>
          Load More Books
        </Button>
      )}
    </VStack>
  );
};

export default withContainer(BookListByCategory);
