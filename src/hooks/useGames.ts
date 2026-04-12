import { useMemo } from 'react';
import { GameQuery } from '../App';
import useData from './useData';
import { Platform } from './usePlatforms';

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: {
    platform: Platform;
  }[];
  metacritic: number;
  rating_top: number;
  rating: number;
  ratings_count: number;
  genres: { id: number; name: string; slug: string }[];
  released: string;
  playtime: number;
}

const useGames = (gameQuery: GameQuery) => {
  const requestConfig = useMemo(
    () => ({
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
      },
    }),
    [gameQuery.genre?.id, gameQuery.platform?.id, gameQuery.sortOrder, gameQuery.searchText]
  );

  return useData<Game>('/games', requestConfig);
};

export default useGames;
