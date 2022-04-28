import { normalizeString } from '~/utils/string';

describe('normalizeString function testing', () => {
  it('Should remove accents or diacritics of name', () => {
    const normalized = normalizeString('Héctor Gárciá');
    expect(normalized).toBe('Hector Garcia');
  });

  it('Should not trim any spaces', () => {
    const normalized = normalizeString('   Héctor Gárciá  ');
    expect(normalized).toBe('   Hector Garcia  ');
  });
});
