import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { ChakraProvider } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import BookDetailModal from '~/components/BookDetailModal';
import { withBookCategory } from '~/hoc/with-book-category';
import * as categoryServices from '~/services/category';
import { bookModalState } from '~/store/book';
import { Book } from '~/types/book';
import { Category } from '~/types/category';

const bookData: Book = {
  id: 1,
  title: 'My Dummy Book',
  description: 'Lorem book description',
  audio_length: 0,
  sections: [
    { title: 'Section 1', content: 'section one content' },
    { title: 'Section 2', content: 'section two content' },
  ],
  authors: ['John Doe', 'Jane Doe'],
  category_id: 1,
  cover_url:
    'https://cdn.sejutacita.id/6138d21e3a09ee0013ee730f/Booku/c55ef13f-eb0e-40de-a04c-e46df5940682.png',
};

const categoriesData: Category[] = [
  { id: 1, name: 'Video' },
  { id: 2, name: 'Music' },
];

const MockBookDetailModal: FC = () => (
  <ChakraProvider>
    <RecoilRoot>
      <BrowserRouter>
        <MockBookDetailModalContent />
      </BrowserRouter>
    </RecoilRoot>
  </ChakraProvider>
);

const MockBookDetailModalContent: FC = withBookCategory(() => {
  const setBook = useSetRecoilState(bookModalState);
  // set default book modal data
  useEffect(() => setBook(bookData), []);
  return <BookDetailModal />;
});

describe('BookDetailModal component testing', () => {
  let matchMedia: MatchMediaMock;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
    jest.clearAllMocks();
  });

  it('Should render book detail modal component correctly', async () => {
    jest
      .spyOn(categoryServices, 'getCategories')
      .mockResolvedValue(categoriesData);

    render(<MockBookDetailModal />);

    await waitFor(() =>
      expect(screen.getByText(/my dummy book/i)).toBeInTheDocument(),
    );
    const firstAuthorElm = screen.getByText(/john doe/i);
    const secondAuthorElm = screen.getByText(/jane doe/i);
    const sectionElm = screen.getByText(/2 sections/i);
    const categoryElm = screen.getByText(/video/i);
    expect(firstAuthorElm).toBeInTheDocument();
    expect(secondAuthorElm).toBeInTheDocument();
    expect(sectionElm).toBeInTheDocument();
    expect(categoryElm).toBeInTheDocument();
  });
});
