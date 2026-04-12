import {
  Badge,
  Box,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaHeart, FaHistory, FaRegHeart } from 'react-icons/fa';
import { Game } from '../hooks/useGames';
import getCroppedImageUrl from '../services/image-url';

interface Props {
  title: string;
  caption: string;
  icon: 'wishlist' | 'history';
  games: Game[];
  onOpen: (game: Game) => void;
  onToggleWishlist: (game: Game) => void;
  isWishlisted: (gameId: number) => boolean;
}

const GameShelf = ({
  title,
  caption,
  icon,
  games,
  onOpen,
  onToggleWishlist,
  isWishlisted,
}: Props) => {
  const panelBg = useColorModeValue(
    'rgba(255,255,255,0.62)',
    'rgba(255,255,255,0.04)'
  );
  const borderColor = useColorModeValue(
    'rgba(20,32,51,0.08)',
    'rgba(255,255,255,0.08)'
  );
  const titleColor = useColorModeValue('gray.800', 'white');
  const metaColor = useColorModeValue('gray.500', 'gray.400');
  const accentBg = icon === 'wishlist' ? 'accent.500' : 'brand.500';
  const AccentIcon = icon === 'wishlist' ? FaHeart : FaHistory;
  const shelfCardBg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.50');

  if (games.length === 0) return null;

  return (
    <VStack
      align="stretch"
      spacing={4}
      mb={8}
      p={{ base: 4, md: 5 }}
      bg={panelBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="28px"
      className="modern-panel"
    >
      <Box>
        <Badge
          display="inline-flex"
          alignItems="center"
          gap={2}
          px={3}
          py={1.5}
          borderRadius="full"
          bg={accentBg}
          color="white"
          fontSize="10px"
          letterSpacing="0.12em"
          textTransform="uppercase"
          mb={2}
        >
          <Box as={AccentIcon} boxSize="10px" />
          Your library
        </Badge>
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="700"
          letterSpacing="-0.04em"
          color={titleColor}
        >
          {title}
        </Text>
        <Text fontSize="sm" color={metaColor}>
          {caption}
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4}>
        {games.map((game) => {
          const saved = isWishlisted(game.id);

          return (
            <Box
              key={game.id}
              position="relative"
              overflow="hidden"
              borderRadius="24px"
              border="1px solid"
              borderColor={borderColor}
              bg={shelfCardBg}
              className="modern-panel game-card"
              cursor="pointer"
              onClick={() => onOpen(game)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onOpen(game);
                }
              }}
              role="button"
              tabIndex={0}
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'card-hover',
              }}
              transition="all 0.25s ease"
            >
              <Image
                src={getCroppedImageUrl(game.background_image)}
                alt={game.name}
                h="140px"
                w="100%"
                objectFit="cover"
              />
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, rgba(8,17,31,0.92), rgba(8,17,31,0.15) 55%, transparent)"
                pointerEvents="none"
              />
              <IconButton
                aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
                icon={saved ? <FaHeart /> : <FaRegHeart />}
                position="absolute"
                top={3}
                right={3}
                size="sm"
                borderRadius="full"
                bg="rgba(8,17,31,0.55)"
                color="white"
                border="1px solid rgba(255,255,255,0.14)"
                _hover={{ bg: 'rgba(8,17,31,0.75)' }}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleWishlist(game);
                }}
              />
              <VStack
                align="start"
                spacing={1}
                position="absolute"
                left={4}
                right={4}
                bottom={4}
              >
                <Text
                  fontSize="lg"
                  fontWeight="700"
                  letterSpacing="-0.03em"
                  color="white"
                  noOfLines={2}
                >
                  {game.name}
                </Text>
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                  color="whiteAlpha.700"
                >
                  {game.genres?.[0]?.name || 'Game'} pick
                </Text>
              </VStack>
            </Box>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default GameShelf;
