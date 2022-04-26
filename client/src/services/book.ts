import appConfig from '~/config/app';
import { Book } from '~/types/book';

export async function getBooksByCategory(
  categoryId: number,
  page = 0,
  size: 10,
) {
  const res = await fetch(
    appConfig.apiURL +
      '/fee-assessment-books' +
      '?' +
      new URLSearchParams({
        categoryId: categoryId.toString(),
        page: page.toString(),
        size: size.toString(),
      }),
  );
  const data = await res.json();

  return data as Book[];
}
