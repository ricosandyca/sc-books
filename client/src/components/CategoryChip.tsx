import { Button, ButtonProps, Text } from '@chakra-ui/react';
import { FC, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Category } from '~/types/category';
import { textToColor } from '~/utils/color';

export type CategoryChipProps = ButtonProps & {
  category: Category;
  isActive: boolean;
};

const CategoryChip: FC<CategoryChipProps> = ({
  category,
  isActive,
  ...buttonProps
}) => {
  const navigate = useNavigate();
  const colorScheme = useMemo(() => {
    return textToColor(category.name);
  }, [category.name]);

  return (
    <Button
      colorScheme={colorScheme}
      size="sm"
      borderRadius="sm"
      rounded="md"
      fontWeight="medium"
      flexShrink={0}
      variant={isActive ? 'solid' : 'outline'}
      onClick={() => navigate(`/categories/${category.id}/books`)}
      borderColor="inherit"
      {...buttonProps}
    >
      <Text noOfLines={1} w="full">
        {category.name}
      </Text>
    </Button>
  );
};

export default memo(CategoryChip);
