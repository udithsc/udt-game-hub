import {
  Box,
  HStack,
  Image,
  Text,
  useDisclosure,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';
import getCroppedImageUrl from '../services/image-url';
import GameModal from './GameModal';
import { FaStar, FaClock, FaCalendarAlt } from 'react-icons/fa';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', '#12152a');
  const borderColor = useColorModeValue(
    'rgba(0, 0, 0, 0.06)',
    'rgba(255, 255, 255, 0.04)'
  );
  const metaTextColor = useColorModeValue('gray.500', 'gray.400');
  const genreBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
  const genreColor = useColorModeValue('gray.600', 'gray.300');

  const releaseYear = game.released
    ? new Date(game.released).getFullYear()
    : null;

  // Rating stars (out of 5)
  const ratingDisplay = game.rating ? game.rating.toFixed(1) : null;

  // Top 2 genres only
  const topGenres = game.genres?.slice(0, 2) ?? [];

  return (
    <>
      <Box
        className="game-card"
        bg={cardBg}
        borderRadius="2xl"
        overflow="hidden"
        onClick={onOpen}
        cursor="pointer"
        transition="all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
        border="1px solid"
        borderColor={borderColor}
        _hover={{
          transform: 'translateY(-6px)',
          boxShadow: 'card-hover',
          borderColor: 'brand.500',
        }}
        height="100%"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {/* Image container */}
        <Box position="relative" overflow="hidden" height="190px" flexShrink={0}>
          <Image
            className="game-card-image"
            src={getCroppedImageUrl(game.background_image)}
            height="100%"
            width="100%"
            objectFit="cover"
          />
          {/* Gradient Overlay */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="70%"
            bgGradient={`linear(to-t, ${cardBg} 0%, transparent 100%)`}
            pointerEvents="none"
          />

          {/* Metacritic badge — top right */}
          {game.metacritic > 0 && (
            <Box position="absolute" top={2.5} right={2.5}>
              <CriticScore score={game.metacritic} />
            </Box>
          )}

          {/* Genre tags — bottom left over image */}
          {topGenres.length > 0 && (
            <HStack
              position="absolute"
              bottom={2.5}
              left={3}
              spacing={1.5}
              flexWrap="wrap"
            >
              {topGenres.map((genre) => (
                <Badge
                  key={genre.id}
                  bg="rgba(131, 71, 255, 0.25)"
                  color="purple.200"
                  fontSize="9px"
                  fontWeight="700"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  border="1px solid rgba(131, 71, 255, 0.35)"
                  backdropFilter="blur(6px)"
                >
                  {genre.name}
                </Badge>
              ))}
            </HStack>
          )}
        </Box>

        {/* Card Body */}
        <Box p={3.5} flex={1} display="flex" flexDirection="column" gap={2.5}>
          {/* Game Title */}
          <Text
            fontSize="sm"
            fontWeight="700"
            lineHeight="1.3"
            noOfLines={2}
            letterSpacing="-0.01em"
          >
            {game.name}
          </Text>

          {/* Platform icons */}
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform) ?? []}
          />

          {/* Divider */}
          <Box
            borderTop="1px solid"
            borderColor={borderColor}
            mt={0.5}
          />

          {/* Meta row: rating + playtime + year */}
          <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5}>
            {/* Star rating */}
            {ratingDisplay && (
              <HStack spacing={1} alignItems="center">
                <Box as={FaStar} color="yellow.400" boxSize="11px" />
                <Text fontSize="xs" fontWeight="700" color={metaTextColor}>
                  {ratingDisplay}
                </Text>
                {game.ratings_count > 0 && (
                  <Text fontSize="10px" color={metaTextColor} opacity={0.7}>
                    ({game.ratings_count > 999
                      ? `${(game.ratings_count / 1000).toFixed(1)}k`
                      : game.ratings_count})
                  </Text>
                )}
              </HStack>
            )}

            <HStack spacing={2.5}>
              {/* Playtime */}
              {game.playtime > 0 && (
                <HStack spacing={1} alignItems="center">
                  <Box as={FaClock} color={metaTextColor} boxSize="10px" />
                  <Text fontSize="10px" fontWeight="600" color={metaTextColor}>
                    {game.playtime}h
                  </Text>
                </HStack>
              )}

              {/* Release year */}
              {releaseYear && (
                <HStack spacing={1} alignItems="center">
                  <Box as={FaCalendarAlt} color={metaTextColor} boxSize="10px" />
                  <Text fontSize="10px" fontWeight="600" color={metaTextColor}>
                    {releaseYear}
                  </Text>
                </HStack>
              )}
            </HStack>
          </HStack>
        </Box>
      </Box>

      <GameModal game={game} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default GameCard;
