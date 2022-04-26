import appConfig from '~/config/app';
import { Category } from '~/types/category';

export async function getCategories() {
  const res = await fetch(appConfig.apiURL + '/fee-assessment-categories');
  const data = await res.json();

  return data as Category[];
}
