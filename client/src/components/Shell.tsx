import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, memo, ReactNode } from 'react';
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineBookmarkBorder,
} from 'react-icons/md';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import appConfig from '~/config/app';
import { withContainer } from '~/hoc/with-container';

export type ShellProps = {
  children: ReactNode;
};

const AppBarContent: FC = withContainer(() => {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(MdDarkMode, MdLightMode);

  return (
    <HStack h="full" w="full" align="center" justify="space-between">
      {/* App logo */}
      <HStack as={RouterLink} to="/">
        <Box>
          <Image alt="App logo" src="/sejutacita-logo.webp" h="42px" w="42px" />
        </Box>
        <Heading fontWeight="500" fontSize="xl">
          {appConfig.appName}
        </Heading>
      </HStack>

      <HStack>
        {/* Bookmark button */}
        <IconButton
          aria-label="Bookmark page"
          icon={<Icon fontSize="lg" as={MdOutlineBookmarkBorder} />}
          variant="outline"
          onClick={() => navigate('/bookmark')}
          color="primary"
          borderRadius="xl"
        />

        {/* Toggle theme button */}
        <IconButton
          aria-label="Toggle theme"
          icon={<Icon fontSize="lg" as={icon} />}
          variant="outline"
          onClick={toggleColorMode}
          color="primary"
          borderRadius="xl"
        />
      </HStack>
    </HStack>
  );
});

const Shell: FC<ShellProps> = ({ children }) => {
  const alphaBg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)',
  );

  return (
    <Box position="relative">
      {/* App bar */}
      <Box
        position="fixed"
        top={0}
        w="full"
        h="80px"
        zIndex={2}
        bg={alphaBg}
        backdropFilter="blur(10px) saturate(180%)"
        shadow="sm"
        borderBottomWidth="1px"
      >
        <AppBarContent />
      </Box>

      {/* Main content */}
      <Box pt={['100px', null, null, null, '120px']} h="full" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
};

export default memo(Shell);
