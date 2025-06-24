import { useState } from 'react';
import { Box, Container, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';
import GenreList from './components/GenreList';
import PlatformSelector from './components/PlatformSelector';
import { Genre } from './hooks/useGenres';
import { Platform } from './hooks/usePlatforms';
import SortSelector from './components/SortSelector';
import GameHeading from './components/GameHeading';

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Box>
      <NavBar
        onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
        selectedGenre={gameQuery.genre}
      />
      <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
        <Grid
          templateAreas={{
            base: `"main"`,
            lg: `"aside main"`,
          }}
          templateColumns={{
            base: '1fr',
            lg: '250px 1fr',
          }}
          gap={6}
          pt="80px"
        >
          <Show above='lg'>
            <GridItem 
              area={'aside'}
              position="sticky"
              top="80px"
              h="calc(100vh - 80px)"
              overflowY="auto"
            >
              <GenreList
                onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
                selectedGenre={gameQuery.genre}
              />
            </GridItem>
          </Show>
          <GridItem area={'main'}>
            <Box>
              <GameHeading gameQuery={gameQuery} />
              <Flex 
                marginBottom={5} 
                gap={4} 
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
  );
}

export default App;
