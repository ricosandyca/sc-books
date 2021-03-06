import { extendTheme } from '@chakra-ui/react';
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
    global: () => ({
      body: {
        color: 'text',
        bg: 'bg',
      },
    }),
  },
  fonts: {
    heading: "Inter, 'sans-serif'",
    body: "Inter, 'sans-serif'",
  },
  colors: {
    primary: colors.pink,
    secondary: colors.blue,
  },
  semanticTokens: {
    colors: {
      primary: {
        default: 'primary.500',
        _dark: 'primary.200',
      },
      secondary: {
        default: 'secondary.500',
        _dark: 'secondary.200',
      },
      bg: {
        default: 'white',
        _dark: 'gray.800',
      },
      text: {
        default: 'gray.700',
        _dark: 'gray.100',
      },
      subtext: {
        default: 'gray.500',
        _dark: 'gray.300',
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
