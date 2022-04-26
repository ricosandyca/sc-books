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
