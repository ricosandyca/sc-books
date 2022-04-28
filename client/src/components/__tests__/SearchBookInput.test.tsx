import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { FC, useEffect } from 'react';
import { RecoilRoot, RecoilState, useRecoilValue } from 'recoil';

import SearchBookInput from '~/components/SearchBookInput';
import { bookSearchKeywordState } from '~/store/book';

type RecoilObserverProps<T> = {
  node: RecoilState<T>;
  onChange: (val: T) => T;
};

const RecoilObserver: FC<RecoilObserverProps<any>> = ({ node, onChange }) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [value, onChange]);
  return null;
};

describe('SearchBookInput component testing', () => {
  it('Should change search input component correctly', () => {
    const onChange = jest.fn();

    render(
      <RecoilRoot>
        <SearchBookInput />
        <RecoilObserver node={bookSearchKeywordState} onChange={onChange} />
      </RecoilRoot>,
    );

    const inputElm = screen.getByTestId('book-search-input');

    fireEvent.change(inputElm, { target: { value: 'Hello world' } });
    fireEvent.change(inputElm, { target: { value: 'Lorem ipsum' } });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('Hello world');
    expect(onChange).toHaveBeenCalledWith('Lorem ipsum');
  });
});
