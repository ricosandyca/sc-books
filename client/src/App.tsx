import { ChakraProvider } from '@chakra-ui/react';
import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Routes from '~/routes';
import theme from '~/styles/theme';

const App: FC = () => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
