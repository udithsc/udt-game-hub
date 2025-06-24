import { 
  Box, 
  Container, 
  HStack, 
  IconButton,
  Image, 
  Show, 
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from '../assets/logo.webp';
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
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Box 
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={bgColor}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={borderColor}
        zIndex={100}
        boxShadow={'sm'}
      >
        <Container maxW={'container.xl'} p={0}>
          <HStack 
            spacing={4} 
            py={4} 
            px={{ base: 4, md: 6 }}
            justify="space-between"
            align="center"
          >
            <HStack spacing={4}>
              <Show below="lg">
                <IconButton 
                  icon={<HamburgerIcon />} 
                  aria-label="Open navigation"
                  onClick={onOpen}
                  variant="ghost"
                />
              </Show>
              <Image 
                src={logo} 
                width={{ base: '150px', md: '250px' }} 
                objectFit="contain"
                alt="Game Hub Logo"
              />
            </HStack>
            <HStack spacing={4} flex={1} justify="flex-end">
              <Show above='md'>
                <Box flex={1} maxW="500px">
                  <SearchInput onSearch={onSearch} />
                </Box>
              </Show>
              <ColorModeSwitch />
            </HStack>
          </HStack>
        </Container>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Genres</DrawerHeader>
          <DrawerBody>
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
