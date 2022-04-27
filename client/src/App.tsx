import { useColorModeValue } from '@chakra-ui/react';
import colors from '@chakra-ui/theme/foundations/colors';
import { FC, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '~/routes';

const App: FC = () => {
  const metaColor = useColorModeValue(colors.white, colors.gray[800]);

  // dynamically change the meta theme color on theme changed
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    metaThemeColor?.setAttribute('content', metaColor);
  }, [metaColor]);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
