import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getCategories } from '~/services/category';
import { bookCategoryIdState } from '~/store/book';
import { categoryListState } from '~/store/category';

export function useCategoryListFetcher() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useRecoilState(categoryListState);
  const setBookCategoryId = useSetRecoilState(bookCategoryIdState);

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategories(categories);
        // set category id as first category in the list
        // as the default category id
        setBookCategoryId(categories[0].id);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading, error };
}
