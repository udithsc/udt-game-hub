import {
  Box,
  Container,
  HStack,
  IconButton,
  Icon,
  VStack,
  Show,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaGamepad } from 'react-icons/fa';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { Genre } from '../hooks/useGenres';
import GenreList from './GenreList';

interface Props {
  searchText: string;
  onSearch: (searchText: string) => void;
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const NavBar = ({
  searchText,
  onSearch,
  onSelectGenre,
  selectedGenre,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navBg = useColorModeValue(
    'rgba(255, 255, 255, 0.68)',
    'rgba(8, 17, 31, 0.62)'
  );
  const borderColor = useColorModeValue(
    'rgba(20, 32, 51, 0.08)',
    'rgba(255, 255, 255, 0.08)'
  );
  const brandColor = useColorModeValue('gray.900', 'white');

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={navBg}
        backdropFilter="blur(20px) saturate(1.5)"
        zIndex={100}
        transition="all 0.3s ease"
      >
        <Container maxW="container.xl" p={0}>
          <Box py={3} px={{ base: 4, md: 6 }}>
            <HStack spacing={4} justify="space-between" align="center">
              <Show below="lg">
                <HStack spacing={3}>
                  <IconButton
                    icon={<HamburgerIcon />}
                    aria-label="Open navigation"
                    onClick={onOpen}
                    variant="ghost"
                    size="sm"
                    borderRadius="lg"
                  />
                </HStack>
              </Show>
              <HStack spacing={2} align="center">
                <Box
                  bgGradient="linear(to-br, brand.500, accent.400)"
                  p={2}
                  borderRadius="2xl"
                  boxShadow="glow"
                >
                  <Icon as={FaGamepad} boxSize="20px" color="white" />
                </Box>
                <VStack
                  spacing={0}
                  align="start"
                  display={{ base: 'none', sm: 'flex' }}
                >
                  <Text
                    fontSize="lg"
                    fontWeight="800"
                    color={brandColor}
                    lineHeight="1"
                  >
                    UDT GameHub
                  </Text>
                  <Text
                    fontSize="10px"
                    textTransform="uppercase"
                    letterSpacing="0.16em"
                    color="gray.500"
                  >
                    Discover your next obsession
                  </Text>
                </VStack>
              </HStack>
              <HStack spacing={3} flex={1} justify="flex-end">
                <Show above="md">
                  <Box flex={1} maxW="480px">
                    <SearchInput value={searchText} onSearch={onSearch} />
                  </Box>
                </Show>
                <ColorModeSwitch />
              </HStack>
            </HStack>

            <Show below="md">
              <Box mt={3}>
                <SearchInput value={searchText} onSearch={onSearch} />
              </Box>
            </Show>
          </Box>
        </Container>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
        <DrawerContent
          bg={useColorModeValue('rgba(245,247,251,0.96)', 'rgba(8,17,31,0.96)')}
          borderRightWidth="1px"
          borderRightColor={borderColor}
          backdropFilter="blur(22px)"
        >
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor={borderColor}
            fontWeight="700"
          >
            Genres
          </DrawerHeader>
          <DrawerBody p={3}>
            <GenreList
              selectedGenre={selectedGenre}
              onSelectGenre={(genre) => {
                onSelectGenre(genre);
                onClose();
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
