import colors from '@chakra-ui/theme/foundations/colors';

import { textToColor } from '~/utils/color';

const validChakraColors = Object.keys(colors);

describe('textToColor function testing', () => {
  it('Should return valid chakra color schemes', () => {
    const colorOne = textToColor('Lorem ipsum dolor');
    const colorTwo = textToColor('Ipsum dolor');

    expect(validChakraColors).toContain(colorOne);
    expect(validChakraColors).toContain(colorTwo);
  });
});
