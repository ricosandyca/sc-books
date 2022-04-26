import colors from '@chakra-ui/theme/foundations/colors';

export function textToColor(str: string, mode: 'light' | 'dark') {
  const intOfStr = str.charCodeAt(0) - 97 + str.length;

  const colorLevel = mode === 'light' ? '500' : '200';
  const allColors: string[] = Object.keys(colors).reduce(
    (state: string[], key) => {
      const curr = (colors as any)[key];
      const currColor = curr[colorLevel];
      return currColor ? [...state, currColor] : state;
    },
    [],
  );

  let index = intOfStr % allColors.length;
  index = index < 0 ? index * -1 : index;

  return allColors[index] || allColors[0];
}
