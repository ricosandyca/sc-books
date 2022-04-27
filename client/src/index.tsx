import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';
import theme from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </RecoilRoot>,
);
