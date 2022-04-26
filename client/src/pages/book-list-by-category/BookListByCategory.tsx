import { Button, VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BookList from '~/components/BookList';
import BookListSkeleton from '~/components/BookListSkeleton';
import { withContainer } from '~/hoc/with-container';
import { useBookListAction } from '~/hooks/use-book';
import NotFoundPage from '~/pages/not-found';

const BookListByCategory: FC = () => {
  const { categoryId } = useParams();
  const { loadMoreBooks, books, hasNextPage, isLoading, error } =
    useBookListAction(+categoryId!);

  useEffect(() => {
    loadMoreBooks().then();
  }, []);

  if (error) return <NotFoundPage />;

  return (
    <VStack spacing={12}>
      <VStack spacing={[6, 6, 8, null]}>
        <BookList books={books} />
        {isLoading && <BookListSkeleton noOfSkeletons={10} />}
      </VStack>

      {hasNextPage && (
        <Button variant="outline" onClick={loadMoreBooks} isLoading={isLoading}>
          Load More Books
        </Button>
      )}
    </VStack>
  );
};

export default withContainer(BookListByCategory);
