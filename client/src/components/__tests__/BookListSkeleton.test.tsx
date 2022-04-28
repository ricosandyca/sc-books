import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BookListSkeleton from '~/components/BookListSkeleton';

describe('BookListSkeleton component testing', () => {
  it('Should render 10 loading skeletons', () => {
    render(<BookListSkeleton noOfSkeletons={10} />);

    expect(screen.getAllByTestId(/skeleton-loading-[0-9]+/i)).toHaveLength(10);
  });
});
