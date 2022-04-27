import { Box } from '@chakra-ui/react';
import { FC, ComponentType } from 'react';

// import Footer from '~/components/Footer';
import Shell from '~/components/Shell';

export function withShell<T>(Content: ComponentType<T>): FC<T> {
  return function ShellContent(props: T) {
    return (
      <Shell>
        {/* Main content */}
        <Box pb={20}>
          <Content {...props} />
        </Box>

        {/* Footer */}
        {/* <Footer mt={[8, 12, 16, 20]} /> */}
      </Shell>
    );
  };
}
