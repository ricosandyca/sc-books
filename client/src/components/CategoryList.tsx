import { HStack } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

import { categoryListState } from '~/store/category';
import CategoryChip from './CategoryChip';

const CategoryList: FC = () => {
  const categories = useRecoilValue(categoryListState);

  return (
    <HStack w="full" overflowX="auto">
      {categories.map((category) => (
        <CategoryChip key={category.id} category={category} />
      ))}
    </HStack>
  );
};

export default memo(CategoryList);
