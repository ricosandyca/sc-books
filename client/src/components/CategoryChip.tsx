import { Button, ButtonProps, Text } from '@chakra-ui/react';
import { FC, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { categoryListState } from '~/store/category';

import { textToColor } from '~/utils/color';

export type CategoryChipProps = ButtonProps & {
  categoryId: number;
  isActive: boolean;
};

const CategoryChip: FC<CategoryChipProps> = ({
  categoryId,
  isActive,
  ...buttonProps
}) => {
  const navigate = useNavigate();
  const categories = useRecoilValue(categoryListState);

  const category = useMemo(() => {
    return categories.find(({ id }) => id === categoryId);
  }, [categories, categoryId]);

  const colorScheme = useMemo(() => {
    return textToColor(`${category?.name}`);
  }, [category?.name]);

  if (!category) return null;

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
