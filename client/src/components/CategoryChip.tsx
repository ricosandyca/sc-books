import { Button } from '@chakra-ui/react';
import { FC, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Category } from '~/types/category';
import { textToColor } from '~/utils/color';

export type CategoryChipProps = {
  category: Category;
  isActive: boolean;
};

const CategoryChip: FC<CategoryChipProps> = ({ category, isActive }) => {
  const navigate = useNavigate();
  const colorScheme = useMemo(() => {
    return textToColor(category.name);
  }, [category.name]);

  return (
    <Button
      colorScheme={colorScheme}
      size="sm"
      borderRadius="sm"
      rounded="full"
      fontWeight="medium"
      flexShrink={0}
      variant={isActive ? 'solid' : 'outline'}
      onClick={() => navigate(`/categories/${category.id}/books`)}
    >
      {category.name}
    </Button>
  );
};

export default memo(CategoryChip);
