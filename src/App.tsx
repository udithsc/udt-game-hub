import { useRef, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
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
import HeroSection from './components/HeroSection';

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sidebarBorder = useColorModeValue(
    'rgba(0, 0, 0, 0.04)',
    'rgba(255, 255, 255, 0.04)'
  );

  const scrollToContent = () => {
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box minH="100vh">
      <NavBar
        onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
        selectedGenre={gameQuery.genre}
      />

      {/* Full-bleed hero — outside Container, below fixed NavBar */}
      <Box pt="60px">
        <HeroSection onBrowse={scrollToContent} />
      </Box>

      {/* Main content */}
      <Box ref={mainContentRef}>
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <Grid
            templateAreas={{
              base: `"main"`,
              lg: `"aside main"`,
            }}
            templateColumns={{
              base: '1fr',
              lg: '220px 1fr',
            }}
            gap={8}
            pt={8}
          >
            <Show above="lg">
              <GridItem
                area="aside"
                position="sticky"
                top="72px"
                h="calc(100vh - 72px)"
                overflowY="auto"
                className="genre-sidebar"
                borderRight="1px solid"
                borderColor={sidebarBorder}
                pr={4}
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
              <Box>
                <GameHeading gameQuery={gameQuery} />
                <Flex
                  marginBottom={5}
                  gap={3}
                  direction={{ base: 'column', md: 'row' }}
                  align={{ base: 'stretch', md: 'center' }}
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
              </Box>
              <GameGrid gameQuery={gameQuery} />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
