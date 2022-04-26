import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { createArray } from '~/utils/array';

export type BookListSkeletonProps = {
  noOfSkeletons: number;
};

const BookListSkeleton: FC<BookListSkeletonProps> = ({ noOfSkeletons }) => {
  const nums = createArray(noOfSkeletons);

  return (
    <Box w="full">
      <SimpleGrid columns={[2, 3, 4, 4, 5]} spacing={[6, 6, 8, null]}>
        {nums.map((n) => (
          <Skeleton key={n} w="full" h="320px" rounded="lg" />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default memo(BookListSkeleton);
