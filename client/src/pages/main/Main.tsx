import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { categoryListState } from '~/store/category';

const Main: FC = () => {
  const navigate = useNavigate();
  const categories = useRecoilValue(categoryListState);

  useEffect(() => {
    // set default category id as the first item in the list
    const defaultCategoryId = categories[0].id;
    if (defaultCategoryId)
      return navigate(`/categories/${defaultCategoryId}/books`);
  }, [categories]);

  return null;
};

export default Main;
