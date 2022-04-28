import { Button, ButtonProps, Text } from '@chakra-ui/react';
import { FC, memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { categoryListState } from '~/store/category';

import { textToColor } from '~/utils/color';

export type CategoryChipProps = Omit<ButtonProps, 'onClick'> & {
  categoryId: number;
  isActive: boolean;
  onClick?: (navigate: () => any) => any;
};

const CategoryChip: FC<CategoryChipProps> = ({
  categoryId,
  isActive,
  onClick,
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

  const handleClick = useCallback(() => {
    if (!category) return;
    navigate(`/categories/${category.id}/books`);
  }, [navigate, category]);

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
      onClick={() => (onClick ? onClick(handleClick) : handleClick())}
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
