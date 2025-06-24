import {
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Button,
  Heading,
  VStack,
  useColorModeValue,
  Text,
  Box
} from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data: genres, isLoading, error } = useGenres();
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const selectedBg = useColorModeValue('gray.200', 'gray.600');

  if (error) return <Text color="red.500">Failed to load genres.</Text>;
  if (isLoading) return <Spinner />;

  return (
    <VStack align="start" spacing={4} as="nav" py={4}>
      <Heading fontSize='2xl' fontWeight="bold" mb={2}>
        Genres
      </Heading>
      <List spacing={2} w="100%">
        {genres.map((genre) => (
          <ListItem key={genre.id}>
            <Button
              w="100%"
              justifyContent="flex-start"
              variant="ghost"
              onClick={() => onSelectGenre(genre)}
              isActive={genre.id === selectedGenre?.id}
              _hover={{ bg: hoverBg }}
              _active={{ bg: selectedBg }}
              bg={genre.id === selectedGenre?.id ? selectedBg : 'transparent'}
              p={2}
              borderRadius="md"
            >
              <HStack spacing={3}>
                <Image
                  boxSize={'32px'}
                  borderRadius={8}
                  objectFit='cover'
                  src={getCroppedImageUrl(genre.image_background)}
                  alt={genre.name}
                />
                <Text fontSize='md' fontWeight="medium">
                  {genre.name}
                </Text>
              </HStack>
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default GenreList;
