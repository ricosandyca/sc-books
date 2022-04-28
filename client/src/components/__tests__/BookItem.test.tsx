import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import BookItem, { BookItemProps } from '~/components/BookItem';
import { Book } from '~/types/book';

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

const MockBookItem: FC<BookItemProps> = (props) => {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <BrowserRouter>
          <BookItem {...props} />
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  );
};

describe('BookItem component testing', () => {
  it('Should render book item component correctly', () => {
    render(<MockBookItem book={bookData} />);

    const titleElm = screen.getByText(/my dummy book/i);
    const firstAuthorElm = screen.getByText(/john doe/i);
    const secondAuthorElm = screen.getByText(/jane doe/i);
    expect(titleElm).toBeInTheDocument();
    expect(firstAuthorElm).toBeInTheDocument();
    expect(secondAuthorElm).toBeInTheDocument();
  });
});
