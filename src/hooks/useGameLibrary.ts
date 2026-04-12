import { useState } from 'react';
import { Game } from './useGames';

const WISHLIST_KEY = 'udt-game-hub:wishlist';
const RECENTLY_VIEWED_KEY = 'udt-game-hub:recently-viewed';
const RECENT_LIMIT = 8;

const readStorage = (key: string) => {
  if (typeof window === 'undefined') return [] as Game[];

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as Game[]) : [];
  } catch {
    return [];
  }
};

const writeStorage = (key: string, games: Game[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(games));
};

const upsertFront = (games: Game[], game: Game, limit?: number) => {
  const next = [game, ...games.filter((entry) => entry.id !== game.id)];
  return typeof limit === 'number' ? next.slice(0, limit) : next;
};

const useGameLibrary = () => {
  const [wishlist, setWishlist] = useState<Game[]>(() => readStorage(WISHLIST_KEY));
  const [recentlyViewed, setRecentlyViewed] = useState<Game[]>(() =>
    readStorage(RECENTLY_VIEWED_KEY)
  );

  const toggleWishlist = (game: Game) => {
    setWishlist((current) => {
      const exists = current.some((entry) => entry.id === game.id);
      const next = exists
        ? current.filter((entry) => entry.id !== game.id)
        : upsertFront(current, game);

      writeStorage(WISHLIST_KEY, next);
      return next;
    });
  };

  const addRecentlyViewed = (game: Game) => {
    setRecentlyViewed((current) => {
      const next = upsertFront(current, game, RECENT_LIMIT);
      writeStorage(RECENTLY_VIEWED_KEY, next);
      return next;
    });
  };

  return {
    wishlist,
    recentlyViewed,
    isWishlisted: (gameId: number) =>
      wishlist.some((entry) => entry.id === gameId),
    toggleWishlist,
    addRecentlyViewed,
  };
};

export default useGameLibrary;
