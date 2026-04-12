import { Suspense, lazy, useRef, useState } from 'react';
import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Show,
  useColorModeValue,
} from '@chakra-ui/react';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';
import GenreList from './components/GenreList';
import PlatformSelector from './components/PlatformSelector';
import { Genre } from './hooks/useGenres';
import { Platform } from './hooks/usePlatforms';
import SortSelector from './components/SortSelector';
import GameHeading from './components/GameHeading';
import { FaCompass } from 'react-icons/fa';

const HeroSection = lazy(() => import('./components/HeroSection'));

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({
    genre: null,
    platform: null,
    sortOrder: '',
    searchText: '',
  });
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sidebarBorder = useColorModeValue(
    'rgba(20, 32, 51, 0.08)',
    'rgba(255, 255, 255, 0.08)'
  );
  const shellBg = useColorModeValue(
    'rgba(255, 255, 255, 0.72)',
    'rgba(11, 20, 36, 0.72)'
  );
  const shellShadow = useColorModeValue(
    '0 30px 60px rgba(24, 39, 75, 0.12)',
    '0 30px 60px rgba(0, 0, 0, 0.28)'
  );

  const scrollToContent = () => {
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box minH="100vh">
      <NavBar
        searchText={gameQuery.searchText}
        onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
        selectedGenre={gameQuery.genre}
      />

      {/* Full-bleed hero — outside Container, below fixed NavBar */}
      <Box pt="60px">
        <Suspense
          fallback={
            <Skeleton
              height={{ base: '320px', md: '480px', lg: '560px' }}
              width="100%"
              startColor="gray.800"
              endColor="gray.700"
            />
          }
        >
          <HeroSection onBrowse={scrollToContent} />
        </Suspense>
      </Box>

      <Box ref={mainContentRef} pb={{ base: 10, md: 14 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <Box
            mt={{ base: -10, md: -14 }}
            position="relative"
            zIndex={4}
            borderRadius={{ base: '28px', md: '36px' }}
            bg={shellBg}
            border="1px solid"
            borderColor={sidebarBorder}
            boxShadow={shellShadow}
            className="modern-panel"
            px={{ base: 4, md: 6, lg: 8 }}
            py={{ base: 5, md: 7 }}
          >
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              justify="space-between"
              align={{ base: 'flex-start', lg: 'center' }}
              gap={4}
              mb={8}
            >
              <Box>
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
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  mb={3}
                >
                  <Box as={FaCompass} boxSize="10px" />
                  Curated discovery
                </Badge>
                <GameHeading gameQuery={gameQuery} />
              </Box>
              <Flex
                gap={3}
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'stretch', md: 'center' }}
                w={{ base: '100%', lg: 'auto' }}
              >
                <PlatformSelector
                  selectedPlatform={gameQuery.platform}
                  onSelectPlatform={(platform) =>
                    setGameQuery({ ...gameQuery, platform })
                  }
                />
                <SortSelector
                  sortOrder={gameQuery.sortOrder}
                  onSelectSortOrder={(sortOrder) =>
                    setGameQuery({ ...gameQuery, sortOrder })
                  }
                />
              </Flex>
            </Flex>

            <Grid
              templateAreas={{
                base: `"main"`,
                lg: `"aside main"`,
              }}
              templateColumns={{
                base: '1fr',
                lg: '240px 1fr',
              }}
              gap={8}
            >
              <Show above="lg">
                <GridItem
                  area="aside"
                  position="sticky"
                  top="88px"
                  h="calc(100vh - 104px)"
                  overflowY="auto"
                  pr={2}
                  className="genre-sidebar"
                >
                  <GenreList
                    onSelectGenre={(genre) =>
                      setGameQuery({ ...gameQuery, genre })
                    }
                    selectedGenre={gameQuery.genre}
                  />
                </GridItem>
              </Show>
              <GridItem area="main">
                <GameGrid gameQuery={gameQuery} />
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
