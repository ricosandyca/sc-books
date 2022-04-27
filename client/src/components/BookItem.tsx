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
import { FC, memo, useCallback } from 'react';
import { MdBookmarkRemove, MdOutlineBookmarkAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { useBookmarkAction } from '~/hooks/use-bookmark';
import { bookModalState, bookSearchKeywordState } from '~/store/book';

import { Book } from '~/types/book';
import CategoryChip from './CategoryChip';

export type BookItemProps = {
  book: Book;
  showCategory?: boolean;
};

const BookItem: FC<BookItemProps> = ({ book, showCategory }) => {
  const navigate = useNavigate();
  const setSearch = useSetRecoilState(bookSearchKeywordState);
  const setBookModal = useSetRecoilState(bookModalState);
  const { isBookmarked, handleToggleBookmark } = useBookmarkAction(book.id);

  const handleOpenBookDetailModal = useCallback(() => {
    setBookModal(book);
  }, [book]);

  return (
    <VStack spacing={3}>
      {/* Book image */}
      <Box
        position="relative"
        rounded="lg"
        _hover={{
          '.fg-gradient': {
            opacity: 0.75,
          },
          '.bookmark': {
            opacity: 1,
          },
        }}
      >
        <Box cursor="pointer" onClick={handleOpenBookDetailModal}>
          <Image
            src={book.cover_url}
            rounded="lg"
            shadow="rgb(0 40 60 / 10%) 0px 20px 25px, rgb(0 127 255 / 4%) 0px 10px 10px"
          />
          <Box
            opacity={0}
            className="fg-gradient"
            position="absolute"
            w="full"
            h="full"
            top={0}
            rounded="lg"
            bgGradient="linear(to-b, transparent, bg 150%)"
            transitionDuration=".3s"
          />
        </Box>

        {/* Bookmark toggle button */}
        <Tooltip
          label={isBookmarked ? 'Remove from bookmark' : 'Add to bookmark'}
          rounded="md"
          placement="left"
          closeOnClick={false}
          hasArrow
        >
          <IconButton
            aria-label="Bookmark"
            className="bookmark"
            opacity={0}
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
            bg={isBookmarked ? 'primary' : 'text'}
            color="bg"
            _active={{ bg: isBookmarked ? 'primary' : 'text' }}
            _hover={{ bg: isBookmarked ? 'primary' : 'text' }}
          />
        </Tooltip>
      </Box>

      {/* Book info */}
      <VStack align="flex-start" w="full" spacing={0.5}>
        {showCategory && (
          <CategoryChip
            categoryId={book.category_id}
            size="xs"
            mb={1}
            maxW="full"
            isActive
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
