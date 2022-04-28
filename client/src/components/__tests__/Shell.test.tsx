import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Shell, { ShellProps } from '~/components/Shell';

const MockShell: FC<ShellProps> = (props) => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Shell {...props} />
      </BrowserRouter>
    </RecoilRoot>
  );
};

describe('Shell component testing', () => {
  it('Should render shell component correctly', () => {
    render(
      <MockShell>
        <div>My Shell Content</div>
      </MockShell>,
    );

    const contentElm = screen.getByText(/my shell content/i);
    expect(contentElm).toBeInTheDocument();
  });
});
