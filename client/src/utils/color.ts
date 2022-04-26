/**
 * Convert text to valid chakra color scheme
 * this is used to define colors of categories
 *
 * @param str - string to convert
 * @returns string of valid chakra color scheme
 */
export function textToColor(str: string) {
  const availableColors = [
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
  ];
  const intOfStr = str.charCodeAt(0) - 97 + str.length * 2;

  let index = intOfStr % availableColors.length;
  index = index < 0 ? index * -1 : index;

  return availableColors[index] || availableColors[0];
}
