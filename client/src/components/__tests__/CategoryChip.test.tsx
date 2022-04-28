import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import CategoryChip, { CategoryChipProps } from '~/components/CategoryChip';
import { withBookCategory } from '~/hoc/with-book-category';
import * as categoryServices from '~/services/category';
import { Category } from '~/types/category';

const categoriesData: Category[] = [
  { id: 1, name: 'Video' },
  { id: 2, name: 'Music' },
];

const MockCategoryChip: FC<CategoryChipProps> = withBookCategory((props) => (
  <CategoryChip {...props} />
));

describe('CategoryChip component testing', () => {
  let matchMedia: MatchMediaMock;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
    jest.clearAllMocks();
  });

  it('Should render category chip component correctly', async () => {
    jest
      .spyOn(categoryServices, 'getCategories')
      .mockResolvedValue(categoriesData);

    const onClick = jest.fn();

    render(
      <RecoilRoot>
        <BrowserRouter>
          <MockCategoryChip categoryId={1} onClick={onClick} isActive />
        </BrowserRouter>
      </RecoilRoot>,
    );

    await waitFor(() => expect(screen.getByText(/video/i)).toBeInTheDocument());

    const btnElm = screen.getByRole('button');
    fireEvent.click(btnElm);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
