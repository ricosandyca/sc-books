import { atom, selectorFamily } from 'recoil';
import { Category } from '~/types/category';

export const categoryListState = atom<Category[]>({
  key: 'categoryListState',
  default: [],
});

// lookup for selected category detail
export const selectedCategoryState = selectorFamily<
  Category | undefined,
  number
>({
  key: 'selectedCategoryState',
  get:
    (categoryId) =>
    ({ get }) => {
      const categories = get(categoryListState);
      return categories.find(({ id }) => categoryId === id);
    },
});
