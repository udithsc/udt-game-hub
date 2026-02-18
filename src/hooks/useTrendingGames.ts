import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

export interface TrendingGame {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    metacritic: number;
    genres: { id: number; name: string }[];
    released: string;
    playtime: number;
}

const useTrendingGames = () => {
    const [games, setGames] = useState<TrendingGame[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiClient
            .get<{ results: TrendingGame[] }>('/games', {
                params: {
                    ordering: '-metacritic',
                    page_size: 8,
                    metacritic: '85,100',
                },
            })
            .then((res) => {
                setGames(res.data.results.filter((g) => g.background_image));
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    return { games, isLoading };
};

export default useTrendingGames;
