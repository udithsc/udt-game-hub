import {
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Button,
  Heading,
  VStack,
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data: genres, isLoading, error } = useGenres();
  const labelColor = useColorModeValue('gray.500', 'gray.400');

  if (error) return <Text color="red.400">Failed to load genres.</Text>;
  if (isLoading)
    return (
      <VStack py={10}>
        <Spinner color="brand.400" />
      </VStack>
    );

  return (
    <VStack align="start" spacing={2} as="nav" py={2} className="genre-sidebar">
      <Heading
        fontSize="xs"
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing="0.1em"
        color={labelColor}
        mb={2}
        px={3}
      >
        Genres
      </Heading>
      <List spacing={0} w="100%">
        {genres.map((genre) => {
          const isSelected = genre.id === selectedGenre?.id;
          return (
            <ListItem key={genre.id}>
              <Button
                w="100%"
                justifyContent="flex-start"
                variant="ghost"
                onClick={() => onSelectGenre(genre)}
                bg={isSelected ? 'brand.500' : 'transparent'}
                color={isSelected ? 'white' : 'inherit'}
                _hover={{
                  bg: isSelected ? 'brand.600' : 'whiteAlpha.100',
                  transform: 'translateX(4px)',
                }}
                _active={{ bg: 'brand.600' }}
                p={2.5}
                borderRadius="xl"
                transition="all 0.2s ease"
                height="auto"
                minH="44px"
              >
                <HStack spacing={3}>
                  <Box
                    borderRadius="lg"
                    overflow="hidden"
                    flexShrink={0}
                    boxSize="36px"
                    bg="gray.700"
                  >
                    <Image
                      boxSize="36px"
                      objectFit="cover"
                      src={getCroppedImageUrl(genre.image_background)}
                      alt={genre.name}
                    />
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight={isSelected ? '700' : '500'}
                    noOfLines={1}
                  >
                    {genre.name}
                  </Text>
                </HStack>
              </Button>
            </ListItem>
          );
        })}
      </List>
    </VStack>
  );
};

export default GenreList;
