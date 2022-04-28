import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { FC, memo, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { MdBookmarkRemove, MdOutlineBookmarkAdd } from 'react-icons/md';
import { VscListSelection } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import { useBookmarkAction } from '~/hooks/use-bookmark';

import { bookModalState } from '~/store/book';
import { Book } from '~/types/book';
import CategoryChip from './CategoryChip';

const BookDetailModal: FC = () => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });
  const [book, setBook] = useRecoilState(bookModalState);

  const handleCloseModal = useCallback(() => {
    setBook(null);
  }, []);

  return (
    <Modal
      isOpen={!!book}
      onClose={handleCloseModal}
      size={isMDDown ? 'full' : '6xl'}
    >
      <ModalOverlay />
      {book && (
        <ModalContent
          bg="bg"
          overflow="hidden"
          rounded={isMDDown ? 'none' : 'lg'}
        >
          <ModalBody p={0} position="relative">
            {/* Close button */}
            <IconButton
              aria-label="Close modal"
              icon={<Icon fontSize="xl" as={FiArrowLeft} />}
              position="absolute"
              variant="ghost"
              top={5}
              left={5}
              zIndex={5}
              onClick={handleCloseModal}
              rounded="lg"
            />

            {/* Cover gradient image */}
            <Box h="500px" w="full" bg="bg" position="absolute" zIndex={1}>
              <Box
                bgImage={`url('${book.cover_url}')`}
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                w="full"
                h="full"
                opacity={0.25}
              />
              <Box
                position="absolute"
                top={0}
                w="full"
                h="full"
                bgGradient="linear(to-b, transparent -10%, bg 100%)"
              />
            </Box>

            {/* Book info */}
            <Box position="relative" zIndex={2}>
              <BookModalContent book={book} onCloseModal={handleCloseModal} />
            </Box>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export type BookModalContentProps = {
  book: Book;
  onCloseModal: () => any;
};

export const BookModalContent: FC<BookModalContentProps> = ({
  book,
  onCloseModal,
}) => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });
  const { isBookmarked, handleToggleBookmark } = useBookmarkAction(book.id);
  const MainStack = isMDDown ? VStack : HStack;

  return (
    <Container maxW="container.lg" pt={28} pb={16}>
      <MainStack
        spacing={isMDDown ? 10 : 8}
        align={isMDDown ? 'center' : 'flex-start'}
      >
        {/* Left content */}
        <VStack spacing={3}>
          <Image alt={book.title} src={book.cover_url} w="240px" rounded="lg" />

          <HStack spacing={3} w="full" h="40px" alignItems="center">
            {/* No of sections */}
            <HStack
              flex={1}
              h="full"
              bg="secondary"
              color="bg"
              borderRadius="md"
              px={3}
            >
              <Icon fontSize="xl" as={VscListSelection} />
              <Text fontSize="sm">{book.sections.length} Sections</Text>
            </HStack>

            {/* Bookmark button */}
            <Tooltip
              label={isBookmarked ? 'Remove from bookmark' : 'Add to bookmark'}
              rounded="md"
              closeOnClick={false}
              hasArrow
            >
              <IconButton
                aria-label="Bookmark"
                h="40px"
                w="40px"
                icon={
                  <Icon
                    fontSize="xl"
                    as={isBookmarked ? MdBookmarkRemove : MdOutlineBookmarkAdd}
                  />
                }
                onClick={() => handleToggleBookmark(book)}
                transitionDuration=".2s"
                size="sm"
                colorScheme="primary"
                variant={isBookmarked ? 'solid' : 'outline'}
              />
            </Tooltip>
          </HStack>
        </VStack>

        {/* Right content */}
        <VStack align="flex-start" w="full" spacing={3}>
          {/* Catgeory chip */}
          <CategoryChip
            categoryId={book.category_id}
            size="sm"
            mb={1}
            maxW="full"
            onClick={(navigate) => {
              navigate();
              onCloseModal();
            }}
            isActive
          />

          {/* Book title */}
          <Heading>{book.title}</Heading>

          {/* Book description */}
          <Text color="subtext" lineHeight={1.75}>
            {book.description}
          </Text>

          {/* Book sections */}
          <Accordion w="full" allowToggle allowMultiple>
            {book.sections.map((section, i) => (
              <AccordionItem key={i} borderTop={0} borderBottomWidth="1px">
                <AccordionButton
                  fontWeight="medium"
                  fontSize="sm"
                  px={0}
                  _focus={{ boxShadow: 'none' }}
                >
                  <HStack spacing={3}>
                    <Center
                      w="22px"
                      h="22px"
                      color="bg"
                      bg="primary"
                      rounded="full"
                      fontSize="xs"
                    >
                      {i + 1}
                    </Center>
                    <Text>{section.title}</Text>
                  </HStack>
                </AccordionButton>
                <AccordionPanel color="subtext" lineHeight={1.75} pl="34px">
                  {section.content}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </MainStack>
    </Container>
  );
};

export default memo(BookDetailModal);
