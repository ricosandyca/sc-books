import { FC, ComponentType } from 'react';

import Footer from '~/components/Footer';
import Shell from '~/components/Shell';

export function withShell<T>(Content: ComponentType<T>): FC<T> {
  return function ShellContent(props: T) {
    return (
      <Shell>
        <Content {...props} />
        <Footer mt={[6, 10, 14, 28]} />
      </Shell>
    );
  };
}
