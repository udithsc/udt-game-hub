import {
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';
import getCroppedImageUrl from '../services/image-url';
import {
  FaStar,
  FaClock,
  FaCalendarAlt,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';

interface Props {
  game: Game;
  onSelect: (game: Game) => void;
  isWishlisted: boolean;
  onToggleWishlist: (game: Game) => void;
}

const GameCard = ({
  game,
  onSelect,
  isWishlisted,
  onToggleWishlist,
}: Props) => {
  const cardBg = useColorModeValue(
    'rgba(255,255,255,0.82)',
    'rgba(255,255,255,0.04)'
  );
  const borderColor = useColorModeValue(
    'rgba(20, 32, 51, 0.08)',
    'rgba(255, 255, 255, 0.08)'
  );
  const metaTextColor = useColorModeValue('gray.500', 'gray.400');
  const ratingPillBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');

  const releaseYear = game.released
    ? new Date(game.released).getFullYear()
    : null;

  const ratingDisplay = game.rating ? game.rating.toFixed(1) : null;
  const topGenres = game.genres?.slice(0, 2) ?? [];

  return (
    <>
      <Box
        className="modern-panel game-card"
        bg={cardBg}
        borderRadius="28px"
        overflow="hidden"
        onClick={() => onSelect(game)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(game);
          }
        }}
        cursor="pointer"
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${game.name}`}
        transition="all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
        border="1px solid"
        borderColor={borderColor}
        _hover={{
          transform: 'translateY(-8px)',
          boxShadow: 'card-hover',
          borderColor: 'brand.300',
        }}
        _focusVisible={{
          outline: 'none',
          borderColor: 'brand.400',
          boxShadow: '0 0 0 2px rgba(47,115,246,0.35)',
        }}
        height="100%"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Box position="relative" overflow="hidden" height="220px" flexShrink={0}>
          <Image
            className="game-card-image"
            src={getCroppedImageUrl(game.background_image)}
            height="100%"
            width="100%"
            objectFit="cover"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="50%"
            bgGradient={`linear(to-t, ${cardBg} 0%, transparent 100%)`}
            pointerEvents="none"
          />
          {game.metacritic > 0 && (
            <Box position="absolute" top={2.5} right={2.5}>
              <CriticScore score={game.metacritic} />
            </Box>
          )}
          <IconButton
            aria-label={
              isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
            }
            icon={isWishlisted ? <FaHeart /> : <FaRegHeart />}
            position="absolute"
            top={2.5}
            left={2.5}
            size="sm"
            borderRadius="full"
            bg="rgba(8,17,31,0.58)"
            color="white"
            border="1px solid rgba(255,255,255,0.16)"
            _hover={{ bg: 'rgba(8,17,31,0.78)' }}
            onClick={(event) => {
              event.stopPropagation();
              onToggleWishlist(game);
            }}
          />
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
                  bg="rgba(12, 18, 29, 0.58)"
                  color="white"
                  fontSize="9px"
                  fontWeight="700"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  border="1px solid rgba(255,255,255,0.18)"
                  backdropFilter="blur(6px)"
                >
                  {genre.name}
                </Badge>
              ))}
            </HStack>
          )}
        </Box>

        <Box p={4.5} flex={1} display="flex" flexDirection="column" gap={3}>
          <Text
            fontSize="lg"
            fontWeight="700"
            lineHeight="1.15"
            noOfLines={2}
            letterSpacing="-0.03em"
          >
            {game.name}
          </Text>

          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform) ?? []}
          />

          <Box borderTop="1px solid" borderColor={borderColor} mt={1} />

          <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            {ratingDisplay && (
              <HStack
                spacing={1.5}
                alignItems="center"
                px={2.5}
                py={1.5}
                borderRadius="full"
                bg={ratingPillBg}
              >
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
              {game.playtime > 0 && (
                <HStack spacing={1} alignItems="center">
                  <Box as={FaClock} color={metaTextColor} boxSize="10px" />
                  <Text fontSize="10px" fontWeight="600" color={metaTextColor}>
                    {game.playtime}h
                  </Text>
                </HStack>
              )}
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

    </>
  );
};

export default GameCard;
