import { Box, Input } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useRecoilState } from 'recoil';

import { bookSearchKeywordState } from '~/store/book';

const SearchBookInput: FC = () => {
  const [search, setSearch] = useRecoilState(bookSearchKeywordState);

  return (
    <Box>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
    </Box>
  );
};

export default memo(SearchBookInput);
