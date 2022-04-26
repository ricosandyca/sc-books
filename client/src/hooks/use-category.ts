import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getCategories } from '~/services/category';
import { categoryListState } from '~/store/category';

export function useCategoryListFetcher() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useRecoilState(categoryListState);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading, error };
}
