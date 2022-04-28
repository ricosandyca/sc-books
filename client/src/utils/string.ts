/**
 * Normalize string
 * By removing all character accents or diacritics
 *
 * @param str string to normalize
 * @returns normalized string
 */
export function normalizeString(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
