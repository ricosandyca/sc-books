import { FC, ComponentType } from 'react';

import Footer from '~/components/Footer';
import Shell from '~/components/Shell';

export function withShell<T>(Content: ComponentType<T>): FC<T> {
  return function ShellContent(props: T) {
    return (
      <Shell>
        {/* Main content */}
        <Content {...props} />

        {/* Footer */}
        <Footer mt={[8, 12, 16, 20]} />
      </Shell>
    );
  };
}
