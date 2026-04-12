import { Suspense, lazy, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import { GameQuery } from '../App';
import { Game } from '../hooks/useGames';
import useGameLibrary from '../hooks/useGameLibrary';
import GameShelf from './GameShelf';

interface Props {
  gameQuery: GameQuery;
}

const GameModal = lazy(() => import('./GameModal'));

const GameGrid = ({ gameQuery }: Props) => {
  const { data: games, error, isLoading } = useGames(gameQuery);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const {
    wishlist,
    recentlyViewed,
    isWishlisted,
    toggleWishlist,
    addRecentlyViewed,
  } = useGameLibrary();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const emptyStateBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const emptyStateBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

  const handleOpenGame = (game: Game) => {
    addRecentlyViewed(game);
    setSelectedGame(game);
  };

  if (error) return <Text color="red.400">{error}</Text>;

  if (!isLoading && games.length === 0) {
    return (
      <VStack
        spacing={4}
        py={12}
        px={6}
        mt={4}
        borderRadius="2xl"
        bg={emptyStateBg}
        border="1px solid"
        borderColor={emptyStateBorder}
        textAlign="center"
      >
        <Heading size="md">No games matched this search</Heading>
        <Text maxW="md" color="gray.500">
          Try a different title, clear some filters, or switch the platform and
          sort options to widen the results.
        </Text>
      </VStack>
    );
  }

  return (
    <>
      <GameShelf
        title="Wishlist"
        caption="Save standout games and come back when you're ready to dive in."
        icon="wishlist"
        games={wishlist.slice(0, 4)}
        onOpen={handleOpenGame}
        onToggleWishlist={toggleWishlist}
        isWishlisted={isWishlisted}
      />
      <GameShelf
        title="Recently viewed"
        caption="Pick up where you left off without hunting through the catalog again."
        icon="history"
        games={recentlyViewed.slice(0, 4)}
        onOpen={handleOpenGame}
        onToggleWishlist={toggleWishlist}
        isWishlisted={isWishlisted}
      />
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
        spacing={5}
        pb={10}
      >
        {isLoading &&
          skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
        {!isLoading &&
          games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onSelect={handleOpenGame}
              isWishlisted={isWishlisted(game.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
      </SimpleGrid>

      {selectedGame && (
        <Suspense
          fallback={
            <Box
              position="fixed"
              inset={0}
              display="grid"
              placeItems="center"
              bg="blackAlpha.600"
              zIndex={1400}
            >
              <Spinner color="white" size="xl" />
            </Box>
          }
        >
          <GameModal
            game={selectedGame}
            isOpen={!!selectedGame}
            onClose={() => setSelectedGame(null)}
            isWishlisted={isWishlisted(selectedGame.id)}
            onToggleWishlist={toggleWishlist}
          />
        </Suspense>
      )}
    </>
  );
};

export default GameGrid;
