import {
  Badge,
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
  Flex,
} from '@chakra-ui/react';
import { FaCompass, FaLayerGroup } from 'react-icons/fa';
import useGenres, { Genre } from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data: genres, isLoading, error } = useGenres();
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  const rowBg = useColorModeValue(
    'rgba(255,255,255,0.28)',
    'rgba(255,255,255,0.035)'
  );
  const rowHover = useColorModeValue(
    'rgba(255,255,255,0.42)',
    'rgba(255,255,255,0.08)'
  );
  const subtleText = useColorModeValue('gray.600', 'gray.300');
  const statsBg = useColorModeValue(
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.03)'
  );
  const pillBg = useColorModeValue(
    'rgba(255,255,255,0.24)',
    'rgba(255,255,255,0.05)'
  );
  const railLine = useColorModeValue(
    'rgba(20,32,51,0.08)',
    'rgba(255,255,255,0.08)'
  );
  const imageRing = useColorModeValue(
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.08)'
  );

  if (error) return <Text color="red.400">Failed to load genres.</Text>;
  if (isLoading)
    return (
      <VStack py={10}>
        <Spinner color="brand.400" />
      </VStack>
    );

  return (
    <VStack
      align="start"
      spacing={4}
      as="nav"
      py={2}
      pr={2}
      position="relative"
      className="genre-sidebar"
    >
      <Box
        position="absolute"
        top={4}
        bottom={4}
        left="11px"
        w="1px"
        bgGradient={`linear(to-b, transparent, ${railLine}, transparent)`}
        pointerEvents="none"
      />
      <Box w="100%" px={2}>
        <Badge
          display="inline-flex"
          alignItems="center"
          gap={2}
          px={3}
          py={1.5}
          borderRadius="full"
          bg="brand.500"
          color="white"
          fontSize="10px"
          letterSpacing="0.14em"
          textTransform="uppercase"
          mb={3}
        >
          <Box as={FaCompass} boxSize="10px" />
          Navigation
        </Badge>
        <Heading
          fontSize="2xl"
          fontWeight="700"
          letterSpacing="-0.05em"
          lineHeight="1"
          mb={1.5}
        >
          Browse genres
        </Heading>
        <Text fontSize="sm" color={subtleText} maxW="22ch">
          Jump between curated categories and narrow the catalog faster.
        </Text>
      </Box>

      <Flex
        w="100%"
        align="center"
        justify="space-between"
        px={2}
        py={2.5}
        borderRadius="20px"
        bg={statsBg}
        border="1px solid"
        borderColor={railLine}
        backdropFilter="blur(18px)"
      >
        <HStack spacing={2} color={labelColor}>
          <Box as={FaLayerGroup} boxSize="12px" />
          <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase">
            Library
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="700">
          {genres.length} genres
        </Text>
      </Flex>

      <Heading
        fontSize="xs"
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing="0.12em"
        color={labelColor}
        px={2}
      >
        Collections
      </Heading>

      <List spacing={3} w="100%">
        {genres.map((genre) => {
          const isSelected = genre.id === selectedGenre?.id;
          return (
            <ListItem key={genre.id}>
              <Button
                w="100%"
                justifyContent="flex-start"
                variant="ghost"
                onClick={() => onSelectGenre(genre)}
                bg={isSelected ? 'brand.500' : rowBg}
                color={isSelected ? 'white' : 'inherit'}
                _hover={{
                  bg: isSelected ? 'brand.600' : rowHover,
                  transform: 'translateX(6px)',
                }}
                _active={{ bg: 'brand.600' }}
                px={3.5}
                py={3.5}
                borderRadius="26px"
                transition="all 0.2s ease"
                height="auto"
                minH="72px"
                border="1px solid"
                borderColor={
                  isSelected ? 'rgba(255,255,255,0.18)' : railLine
                }
                boxShadow={isSelected ? 'glow' : 'none'}
                position="relative"
                overflow="hidden"
                backdropFilter="blur(18px)"
              >
                {!isSelected && (
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(135deg, rgba(255,255,255,0.22), transparent 60%)"
                    opacity={0.45}
                    pointerEvents="none"
                  />
                )}
                <HStack spacing={3} w="100%" justify="space-between">
                  <HStack spacing={3}>
                    <Box
                      w={isSelected ? '6px' : '0px'}
                      h="40px"
                      borderRadius="full"
                      bg="whiteAlpha.900"
                      opacity={isSelected ? 1 : 0}
                      transition="all 0.2s ease"
                    />
                    <Box
                      borderRadius="xl"
                      overflow="hidden"
                      flexShrink={0}
                      boxSize="44px"
                      bg="gray.700"
                      border="1px solid"
                      borderColor={imageRing}
                    >
                      <Image
                        boxSize="44px"
                        objectFit="cover"
                        src={getCroppedImageUrl(genre.image_background)}
                        alt={genre.name}
                      />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text
                        fontSize="md"
                        fontWeight={isSelected ? '800' : '600'}
                        noOfLines={1}
                        letterSpacing="-0.02em"
                      >
                        {genre.name}
                      </Text>
                      <Text
                        fontSize="11px"
                        color={isSelected ? 'whiteAlpha.800' : labelColor}
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        fontWeight="700"
                      >
                        Category
                      </Text>
                    </VStack>
                  </HStack>
                  <Box
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    bg={
                      isSelected
                        ? 'rgba(255,255,255,0.14)'
                        : pillBg
                    }
                  >
                    <Text
                      fontSize="10px"
                      fontWeight="800"
                      letterSpacing="0.12em"
                      textTransform="uppercase"
                    >
                      View
                    </Text>
                  </Box>
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
