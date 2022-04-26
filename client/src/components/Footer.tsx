import { Box, BoxProps, HStack, Icon, Link, Text } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { MdOutlineCode } from 'react-icons/md';

import appConfig from '~/config/app';
import { withContainer } from '~/hoc/with-container';

const Footer: FC<BoxProps> = (props) => {
  return (
    <Box bg="bg" borderTopWidth="1px" py={10} {...props}>
      <FooterContent />
    </Box>
  );
};

const FooterContent: FC = withContainer(() => {
  return (
    <HStack
      fontFamily="heading"
      justifyContent="center"
      color="text"
      spacing={1.5}
    >
      <Icon as={MdOutlineCode} />
      <Text>with</Text>
      <Icon color="primary" as={AiFillHeart} />
      <Text>by</Text>
      <Link
        color="primary"
        target="_blank"
        href={`${appConfig.appAuthorURL}`}
        _focus={{
          boxShadow: 'none',
        }}
      >
        {appConfig.appAuthor}
      </Link>
    </HStack>
  );
});

export default memo(Footer);
