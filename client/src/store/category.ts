import { atom } from 'recoil';
import { Category } from '~/types/category';

export const categoryListState = atom<Category[]>({
  key: 'categoryListState',
  default: [],
});
