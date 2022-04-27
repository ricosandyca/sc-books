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
import { FC, memo, useMemo } from 'react';
import { MdBookmarkRemove, MdOutlineBookmarkAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useBookmarkAction } from '~/hooks/use-bookmark';
import { bookSearchKeywordState } from '~/store/book';
import { categoryListState } from '~/store/category';

import { Book } from '~/types/book';
import CategoryChip from './CategoryChip';

export type BookItemProps = {
  book: Book;
  showCategory?: boolean;
};

const BookItem: FC<BookItemProps> = ({ book, showCategory }) => {
  const navigate = useNavigate();
  const setSearch = useSetRecoilState(bookSearchKeywordState);
  const categories = useRecoilValue(categoryListState);
  const { isBookmarked, handleToggleBookmark } = useBookmarkAction(book.id);

  const category = useMemo(() => {
    return categories.find(({ id }) => id === book.category_id);
  }, [book.category_id, categories]);

  return (
    <VStack spacing={3}>
      {/* Book image */}
      <Box
        position="relative"
        rounded="lg"
        overflow="hidden"
        _hover={{
          '.fg-gradient': {
            opacity: 0.75,
          },
        }}
      >
        <Box>
          <Image
            src={book.cover_url}
            shadow="rgb(0 40 60 / 10%) 0px 20px 25px, rgb(0 127 255 / 4%) 0px 10px 10px"
          />
          <Box
            opacity={0}
            className="fg-gradient"
            position="absolute"
            w="full"
            h="full"
            top={0}
            bgGradient="linear(to-b, transparent -10%, bg 100%)"
            transitionDuration=".3s"
          />
        </Box>

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
        {showCategory && category && (
          <CategoryChip
            category={category}
            isActive={true}
            size="xs"
            mb={1}
            maxW="full"
          />
        )}

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
