import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  VStack,
} from '@chakra-ui/react';
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
          <VStack
            key={n}
            data-testid={`skeleton-loading-${n}`}
            w="full"
            spacing={4}
          >
            <Skeleton w="full" h="320px" rounded="lg" />
            <VStack spacing={2} w="full">
              <SkeletonText alignSelf="flex-start" noOfLines={1} w="90%" />
              <SkeletonText alignSelf="flex-start" noOfLines={1} w="40%" />
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default memo(BookListSkeleton);
