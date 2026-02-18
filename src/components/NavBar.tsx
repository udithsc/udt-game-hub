import {
  Box,
  Container,
  HStack,
  IconButton,
  Icon,
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
  onSearch: (searchText: string) => void;
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const NavBar = ({ onSearch, onSelectGenre, selectedGenre }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navBg = useColorModeValue(
    'rgba(240, 242, 248, 0.75)',
    'rgba(9, 12, 26, 0.65)'
  );
  const borderColor = useColorModeValue(
    'rgba(0, 0, 0, 0.06)',
    'rgba(255, 255, 255, 0.06)'
  );

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={navBg}
        backdropFilter="blur(20px) saturate(1.5)"
        borderBottom="1px solid"
        borderColor={borderColor}
        zIndex={100}
        transition="all 0.3s ease"
      >
        <Container maxW="container.xl" p={0}>
          <HStack
            spacing={4}
            py={3}
            px={{ base: 4, md: 6 }}
            justify="space-between"
            align="center"
          >
            <HStack spacing={3}>
              <Show below="lg">
                <IconButton
                  icon={<HamburgerIcon />}
                  aria-label="Open navigation"
                  onClick={onOpen}
                  variant="ghost"
                  size="sm"
                  borderRadius="lg"
                />
              </Show>
              <HStack spacing={2} align="center">
                {/* Modern vector logo */}
                <Box
                  bgGradient="linear(to-br, brand.400, accent.500)"
                  p={1.5}
                  borderRadius="lg"
                  boxShadow="glow"
                >
                  <Icon as={FaGamepad} boxSize="20px" color="white" />
                </Box>
                <HStack spacing={0.5}>
                  <Text
                    fontSize="xl"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                    color={useColorModeValue('gray.700', 'white')}
                    display={{ base: 'none', sm: 'block' }}
                  >
                    UDT
                  </Text>
                  <Text
                    fontSize="xl"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                    bgGradient="linear(to-r, brand.400, accent.400)"
                    bgClip="text"
                    display={{ base: 'none', sm: 'block' }}
                  >
                    GameHub
                  </Text>
                </HStack>
              </HStack>
            </HStack>
            <HStack spacing={3} flex={1} justify="flex-end">
              <Show above="md">
                <Box flex={1} maxW="480px">
                  <SearchInput onSearch={onSearch} />
                </Box>
              </Show>
              <ColorModeSwitch />
            </HStack>
          </HStack>
        </Container>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
        <DrawerContent
          bg={useColorModeValue('#f0f2f8', '#0d1024')}
          borderRightWidth="1px"
          borderRightColor={borderColor}
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
