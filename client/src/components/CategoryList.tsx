import { HStack } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

import { categoryListState } from '~/store/category';
import CategoryChip from './CategoryChip';

export type CategoryListProps = {
  selectedCategoryId: number;
};

const CategoryList: FC<CategoryListProps> = ({ selectedCategoryId }) => {
  const categories = useRecoilValue(categoryListState);

  return (
    <HStack w="full" overflowX="auto">
      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          categoryId={category.id}
          isActive={category.id === selectedCategoryId}
        />
      ))}
    </HStack>
  );
};

export default memo(CategoryList);
