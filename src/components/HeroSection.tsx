import { useEffect, useRef, useState, useCallback } from 'react';
import {
    Box,
    Text,
    HStack,
    Badge,
    IconButton,
    Skeleton,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight, FaStar, FaClock } from 'react-icons/fa';
import useTrendingGames from '../hooks/useTrendingGames';

const SLIDE_INTERVAL = 5000;

interface Props {
    onBrowse?: () => void;
}

const HeroSection = ({ onBrowse }: Props) => {
    const { games, isLoading } = useTrendingGames();
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const dotActiveBg = useColorModeValue('white', 'white');
    const dotInactiveBg = useColorModeValue(
        'rgba(255,255,255,0.4)',
        'rgba(255,255,255,0.3)'
    );
    const overlayBg = useColorModeValue(
        'linear-gradient(to right, rgba(10,8,30,0.92) 0%, rgba(10,8,30,0.6) 55%, transparent 100%)',
        'linear-gradient(to right, rgba(5,4,20,0.95) 0%, rgba(5,4,20,0.65) 55%, transparent 100%)'
    );

    const goTo = useCallback(
        (index: number, dir: 'next' | 'prev' = 'next') => {
            if (isAnimating || games.length === 0) return;
            setDirection(dir);
            setIsAnimating(true);
            setTimeout(() => {
                setCurrent(index);
                setIsAnimating(false);
            }, 400);
        },
        [isAnimating, games.length]
    );

    const next = useCallback(() => {
        goTo((current + 1) % games.length, 'next');
    }, [current, games.length, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + games.length) % games.length, 'prev');
    }, [current, games.length, goTo]);

    useEffect(() => {
        if (games.length === 0) return;
        timerRef.current = setInterval(next, SLIDE_INTERVAL);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [games.length, next]);

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(next, SLIDE_INTERVAL);
    };

    if (isLoading) {
        return (
            <Skeleton
                height={{ base: '320px', md: '480px', lg: '560px' }}
                width="100%"
                startColor="gray.800"
                endColor="gray.700"
            />
        );
    }

    if (games.length === 0) return null;

    const game = games[current];
    const releaseYear = game.released ? new Date(game.released).getFullYear() : null;

    const metacriticColor =
        game.metacritic > 75 ? '#48c78e' : game.metacritic > 60 ? '#ffc700' : '#ff5e5e';
    const metacriticBg =
        game.metacritic > 75
            ? 'rgba(72,199,142,0.25)'
            : game.metacritic > 60
                ? 'rgba(255,199,0,0.25)'
                : 'rgba(255,94,94,0.25)';
    const metacriticBorder =
        game.metacritic > 75
            ? 'rgba(72,199,142,0.4)'
            : game.metacritic > 60
                ? 'rgba(255,199,0,0.4)'
                : 'rgba(255,94,94,0.4)';

    return (
        <Box
            position="relative"
            width="100%"
            height={{ base: '320px', md: '480px', lg: '560px' }}
            overflow="hidden"
            className="hero-section"
        >
            {games.map((g, i) => (
                <Box
                    key={g.id}
                    position="absolute"
                    inset={0}
                    backgroundImage={`url(${g.background_image})`}
                    backgroundSize="cover"
                    backgroundPosition="center top"
                    transition="opacity 0.7s ease, transform 0.7s ease"
                    opacity={i === current ? 1 : 0}
                    transform={
                        i === current
                            ? 'scale(1)'
                            : direction === 'next'
                                ? 'scale(1.04)'
                                : 'scale(0.97)'
                    }
                    zIndex={i === current ? 1 : 0}
                />
            ))}

            <Box
                position="absolute"
                inset={0}
                background={overlayBg}
                zIndex={2}
                pointerEvents="none"
            />

            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                height="28%"
                bgGradient="linear(to-t, var(--hero-fade, rgba(9,12,26,0.85)) 0%, transparent 100%)"
                zIndex={2}
                pointerEvents="none"
                className="hero-bottom-fade"
            />

            <Box
                position="absolute"
                inset={0}
                zIndex={3}
                display="flex"
                alignItems="center"
                px={{ base: 6, md: 12, lg: 16 }}
            >
                <Box
                    maxW={{ base: '100%', md: '55%', lg: '50%' }}
                    transform={isAnimating ? 'translateY(12px)' : 'translateY(0)'}
                    opacity={isAnimating ? 0 : 1}
                    transition="all 0.4s ease"
                >
                    {game.genres?.length > 0 && (
                        <HStack spacing={2} mb={3} flexWrap="wrap">
                            {game.genres.slice(0, 3).map((g) => (
                                <Badge
                                    key={g.id}
                                    bg="rgba(131, 71, 255, 0.55)"
                                    color="white"
                                    fontSize="10px"
                                    fontWeight="700"
                                    letterSpacing="0.1em"
                                    textTransform="uppercase"
                                    px={2.5}
                                    py={0.5}
                                    borderRadius="full"
                                    border="1px solid rgba(180, 140, 255, 0.5)"
                                    backdropFilter="blur(8px)"
                                >
                                    {g.name}
                                </Badge>
                            ))}
                        </HStack>
                    )}

                    <Text
                        fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                        fontWeight="900"
                        color="white"
                        lineHeight="1.05"
                        letterSpacing="-0.03em"
                        mb={3}
                        textShadow="0 2px 20px rgba(0,0,0,0.5)"
                        noOfLines={2}
                    >
                        {game.name}
                    </Text>

                    <HStack spacing={4} mb={5} flexWrap="wrap">
                        {game.rating > 0 && (
                            <HStack spacing={1.5}>
                                <Box as={FaStar} color="yellow.400" boxSize="14px" />
                                <Text color="whiteAlpha.900" fontSize="sm" fontWeight="700">
                                    {game.rating.toFixed(1)}
                                </Text>
                            </HStack>
                        )}
                        {game.metacritic > 0 && (
                            <Box
                                bg={metacriticBg}
                                color={metacriticColor}
                                px={2}
                                py={0.5}
                                borderRadius="md"
                                fontSize="xs"
                                fontWeight="800"
                                border="1px solid"
                                borderColor={metacriticBorder}
                            >
                                {game.metacritic} MC
                            </Box>
                        )}
                        {game.playtime > 0 && (
                            <HStack spacing={1.5}>
                                <Box as={FaClock} color="whiteAlpha.700" boxSize="12px" />
                                <Text color="whiteAlpha.700" fontSize="sm" fontWeight="600">
                                    ~{game.playtime}h
                                </Text>
                            </HStack>
                        )}
                        {releaseYear && (
                            <Text color="whiteAlpha.600" fontSize="sm" fontWeight="500">
                                {releaseYear}
                            </Text>
                        )}
                    </HStack>

                    <Box
                        as="button"
                        onClick={onBrowse}
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        px={6}
                        py={3}
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="700"
                        color="white"
                        background="linear-gradient(135deg, #8347ff 0%, #ff3695 100%)"
                        boxShadow="0 4px 24px rgba(131, 71, 255, 0.45)"
                        transition="all 0.25s ease"
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 32px rgba(131, 71, 255, 0.6)',
                        }}
                        cursor="pointer"
                        letterSpacing="0.02em"
                    >
                        Explore Game
                    </Box>
                </Box>
            </Box>

            <IconButton
                aria-label="Previous"
                icon={<FaChevronLeft />}
                position="absolute"
                left={{ base: 2, md: 4 }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={4}
                size="sm"
                borderRadius="full"
                bg="rgba(0,0,0,0.45)"
                color="white"
                border="1px solid rgba(255,255,255,0.15)"
                backdropFilter="blur(8px)"
                _hover={{ bg: 'rgba(131,71,255,0.6)', borderColor: 'brand.400' }}
                onClick={() => { prev(); resetTimer(); }}
            />
            <IconButton
                aria-label="Next"
                icon={<FaChevronRight />}
                position="absolute"
                right={{ base: 2, md: 4 }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={4}
                size="sm"
                borderRadius="full"
                bg="rgba(0,0,0,0.45)"
                color="white"
                border="1px solid rgba(255,255,255,0.15)"
                backdropFilter="blur(8px)"
                _hover={{ bg: 'rgba(131,71,255,0.6)', borderColor: 'brand.400' }}
                onClick={() => { next(); resetTimer(); }}
            />

            <HStack
                position="absolute"
                bottom={4}
                left="50%"
                transform="translateX(-50%)"
                zIndex={4}
                spacing={1.5}
            >
                {games.map((_, i) => (
                    <Box
                        key={i}
                        as="button"
                        onClick={() => { goTo(i, i > current ? 'next' : 'prev'); resetTimer(); }}
                        width={i === current ? '24px' : '8px'}
                        height="8px"
                        borderRadius="full"
                        bg={i === current ? dotActiveBg : dotInactiveBg}
                        transition="all 0.3s ease"
                        cursor="pointer"
                        border="none"
                        p={0}
                        _hover={{ bg: dotActiveBg, opacity: 0.9 }}
                    />
                ))}
            </HStack>

            <Text
                position="absolute"
                bottom={4}
                right={{ base: 4, md: 8 }}
                zIndex={4}
                color="whiteAlpha.600"
                fontSize="xs"
                fontWeight="600"
                letterSpacing="0.1em"
            >
                {String(current + 1).padStart(2, '0')} / {String(games.length).padStart(2, '0')}
            </Text>
        </Box>
    );
};

export default HeroSection;
