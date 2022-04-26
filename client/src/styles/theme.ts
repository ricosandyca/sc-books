import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import colors from '@chakra-ui/theme/foundations/colors';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

export default extendTheme({
  config: { initialColorMode: 'light' },
  styles: {
    global: (props: any) => ({
      body: {
        color: 'text',
        bg: 'bg',
      },
      '::-webkit-scrollbar': {
        w: '10px',
        h: '10px',
        bg: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: 'full',
        bg: mode('gray.300', 'gray.600')(props),
      },
    }),
  },
  fonts: {
    heading: "Inter, 'sans-serif'",
    body: "Inter, 'sans-serif'",
  },
  colors: {
    primary: colors.blue,
  },
  semanticTokens: {
    colors: {
      primary: {
        default: 'primary.500',
        _dark: 'primary.200',
      },
      bg: {
        default: 'white',
        _dark: 'gray.800',
      },
      text: {
        default: 'gray.700',
        _dark: 'gray.100',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
});
