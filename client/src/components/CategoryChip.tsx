import { Button } from '@chakra-ui/react';
import { FC, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Category } from '~/types/category';
import { textToColor } from '~/utils/color';

export type CategoryChipProps = {
  category: Category;
};

const CategoryChip: FC<CategoryChipProps> = ({ category }) => {
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
      onClick={() => navigate(`/categories/${category.id}/books`)}
    >
      {category.name}
    </Button>
  );
};

export default memo(CategoryChip);
