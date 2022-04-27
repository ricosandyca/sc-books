import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useRecoilState } from 'recoil';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

import { bookSearchKeywordState } from '~/store/book';

const SearchBookInput: FC<InputGroupProps> = (props) => {
  const [search, setSearch] = useRecoilState(bookSearchKeywordState);

  return (
    <InputGroup size="md" {...props}>
      <InputLeftElement children={<Icon fontSize="lg" as={FiSearch} />} />
      <Input
        placeholder="Search your favorite title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        rounded="lg"
      />
      {search.trim() && (
        <InputRightElement
          as={IconButton}
          variant="unstyled"
          children={<Icon fontSize="lg" as={AiFillCloseCircle} />}
          onClick={() => setSearch('')}
        />
      )}
    </InputGroup>
  );
};

export default memo(SearchBookInput);
