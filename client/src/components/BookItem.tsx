import {
  Box,
  Button,
  Icon,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { FC, memo } from 'react';
import { MdBookmarkRemove, MdOutlineBookmarkAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useBookmarkAction } from '~/hooks/use-bookmark';

import { bookSearchKeywordState } from '~/store/book';

import { Book } from '~/types/book';

export type BookItemProps = {
  book: Book;
  showCategory?: boolean;
};

const BookItem: FC<BookItemProps> = ({ book }) => {
  const navigate = useNavigate();
  const setSearch = useSetRecoilState(bookSearchKeywordState);
  const { isBookmarked, handleToggleBookmark } = useBookmarkAction(book.id);

  return (
    <VStack spacing={4}>
      {/* Book image */}
      <Box position="relative">
        <Image
          src={book.cover_url}
          shadow="rgb(0 40 60 / 10%) 0px 20px 25px, rgb(0 127 255 / 4%) 0px 10px 10px"
          rounded="lg"
        />

        {/* Bookmark toggle button */}
        <Tooltip
          label={isBookmarked ? 'Remove from bookmark' : 'Bookmark this book'}
          rounded="md"
          placement="left"
          closeOnClick={false}
          hasArrow
        >
          <IconButton
            aria-label="Bookmark"
            icon={
              <Icon
                fontSize="xl"
                as={isBookmarked ? MdBookmarkRemove : MdOutlineBookmarkAdd}
              />
            }
            position="absolute"
            top={2}
            right={2}
            onClick={() => handleToggleBookmark(book)}
            transitionDuration=".2s"
            size="sm"
            bg="text"
            color="bg"
            _active={{ bg: 'text' }}
            _hover={{ bg: 'text' }}
          />
        </Tooltip>
      </Box>

      {/* Book info */}
      <VStack align="flex-start" w="full" spacing={0.5}>
        <Text fontSize="md" fontWeight="medium" noOfLines={2}>
          {book.title}
        </Text>

        {/* Author list */}
        <Box display="inline-block">
          {book.authors.map((author, i) => (
            <Button
              key={i}
              display="inline"
              variant="link"
              size="sm"
              fontWeight="normal"
              onClick={() => {
                setSearch(`author: ${author}`);
                navigate(`/categories/${book.category_id}/books`);
              }}
              _after={
                i < book.authors.length - 1
                  ? { content: '","', mr: 1 }
                  : undefined
              }
            >
              {author}
            </Button>
          ))}
        </Box>
      </VStack>
    </VStack>
  );
};

export default memo(BookItem);
