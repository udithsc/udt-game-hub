import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  HStack,
  Badge,
  IconButton,
  Skeleton,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaFire,
  FaStar,
} from 'react-icons/fa';
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
    'linear-gradient(90deg, rgba(7,14,25,0.96) 0%, rgba(7,14,25,0.78) 38%, rgba(7,14,25,0.32) 70%, transparent 100%)',
    'linear-gradient(90deg, rgba(7,14,25,0.96) 0%, rgba(7,14,25,0.78) 38%, rgba(7,14,25,0.32) 70%, transparent 100%)'
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
        height={{ base: '420px', md: '580px', lg: '660px' }}
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
    game.metacritic > 75 ? '#85f0b2' : game.metacritic > 60 ? '#ffd166' : '#ff8b8b';
  const metacriticBg =
    game.metacritic > 75
      ? 'rgba(95,220,155,0.18)'
      : game.metacritic > 60
        ? 'rgba(255,209,102,0.16)'
        : 'rgba(255,139,139,0.16)';
  const metacriticBorder =
    game.metacritic > 75
      ? 'rgba(95,220,155,0.28)'
      : game.metacritic > 60
        ? 'rgba(255,209,102,0.28)'
        : 'rgba(255,139,139,0.28)';

  return (
    <Box
      position="relative"
      width="100%"
      height={{ base: '420px', md: '580px', lg: '660px' }}
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

      <Box position="absolute" inset={0} background={overlayBg} zIndex={2} pointerEvents="none" />

      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(180deg, rgba(47,115,246,0.18) 0%, transparent 30%, transparent 70%, rgba(8,17,31,0.3) 100%)"
        zIndex={2}
        pointerEvents="none"
      />

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="28%"
        bgGradient="linear(to-t, var(--hero-fade, rgba(8,17,31,0.85)) 0%, transparent 100%)"
        zIndex={2}
        pointerEvents="none"
        className="hero-bottom-fade"
      />

      <Box position="absolute" inset={0} zIndex={3} display="flex" alignItems="center">
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <Box
            maxW={{ base: '100%', md: '60%', lg: '48%' }}
            transform={isAnimating ? 'translateY(12px)' : 'translateY(0)'}
            opacity={isAnimating ? 0 : 1}
            transition="all 0.4s ease"
          >
            <Badge
              display="inline-flex"
              alignItems="center"
              gap={2}
              bg="rgba(255,255,255,0.12)"
              color="white"
              px={3.5}
              py={1.5}
              borderRadius="full"
              border="1px solid rgba(255,255,255,0.16)"
              letterSpacing="0.14em"
              textTransform="uppercase"
              fontSize="10px"
              fontWeight="800"
              mb={4}
            >
              <Box as={FaFire} boxSize="10px" color="accent.200" />
              Trending spotlight
            </Badge>

            {game.genres?.length > 0 && (
              <HStack spacing={2} mb={4} flexWrap="wrap">
                {game.genres.slice(0, 3).map((g) => (
                  <Badge
                    key={g.id}
                    bg="rgba(255,255,255,0.08)"
                    color="white"
                    fontSize="10px"
                    fontWeight="700"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    px={3}
                    py={1}
                    borderRadius="full"
                    border="1px solid rgba(255,255,255,0.12)"
                    backdropFilter="blur(8px)"
                  >
                    {g.name}
                  </Badge>
                ))}
              </HStack>
            )}

            <Text
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="700"
              color="white"
              lineHeight={{ base: '0.98', md: '0.9' }}
              letterSpacing="-0.08em"
              mb={4}
              maxW="12ch"
            >
              {game.name}
            </Text>

            <Text
              color="whiteAlpha.760"
              fontSize={{ base: 'sm', md: 'md' }}
              maxW="42ch"
              lineHeight="1.7"
              mb={6}
            >
              A cinematic pick from the top-rated catalog, surfaced for quick
              discovery with rich filters and beautifully paced browsing.
            </Text>

            <HStack spacing={3} mb={8} flexWrap="wrap">
              {game.rating > 0 && (
                <HStack
                  spacing={2}
                  px={3}
                  py={2}
                  borderRadius="full"
                  bg="rgba(255,255,255,0.08)"
                  border="1px solid rgba(255,255,255,0.12)"
                >
                  <Box as={FaStar} color="yellow.300" boxSize="13px" />
                  <Text color="white" fontSize="sm" fontWeight="700">
                    {game.rating.toFixed(1)}
                  </Text>
                </HStack>
              )}
              {game.metacritic > 0 && (
                <Box
                  bg={metacriticBg}
                  color={metacriticColor}
                  px={3}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="800"
                  border="1px solid"
                  borderColor={metacriticBorder}
                >
                  {game.metacritic} Metacritic
                </Box>
              )}
              {game.playtime > 0 && (
                <HStack
                  spacing={2}
                  px={3}
                  py={2}
                  borderRadius="full"
                  bg="rgba(255,255,255,0.08)"
                  border="1px solid rgba(255,255,255,0.12)"
                >
                  <Box as={FaClock} color="whiteAlpha.800" boxSize="12px" />
                  <Text color="whiteAlpha.900" fontSize="sm" fontWeight="600">
                    ~{game.playtime}h
                  </Text>
                </HStack>
              )}
              {releaseYear && (
                <Text color="whiteAlpha.700" fontSize="sm" fontWeight="600">
                  Released {releaseYear}
                </Text>
              )}
            </HStack>

            <HStack spacing={4} align="stretch" flexWrap="wrap">
              <Button size="lg" variant="solid" borderRadius="full" onClick={onBrowse}>
                Explore catalog
              </Button>
              <VStack
                align="start"
                spacing={0.5}
                px={4}
                py={3}
                borderRadius="24px"
                bg="rgba(255,255,255,0.08)"
                border="1px solid rgba(255,255,255,0.12)"
              >
                <Text color="whiteAlpha.700" fontSize="10px" letterSpacing="0.14em" textTransform="uppercase">
                  Now browsing
                </Text>
                <Text color="white" fontSize="sm" fontWeight="700">
                  {String(current + 1).padStart(2, '0')} of {String(games.length).padStart(2, '0')}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Container>
      </Box>

      <IconButton
        aria-label="Previous"
        icon={<FaChevronLeft />}
        position="absolute"
        left={{ base: 3, md: 6 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={4}
        size="md"
        borderRadius="full"
        bg="rgba(7,14,25,0.44)"
        color="white"
        border="1px solid rgba(255,255,255,0.15)"
        backdropFilter="blur(8px)"
        _hover={{ bg: 'rgba(47,115,246,0.68)', borderColor: 'brand.300' }}
        onClick={() => {
          prev();
          resetTimer();
        }}
      />
      <IconButton
        aria-label="Next"
        icon={<FaChevronRight />}
        position="absolute"
        right={{ base: 3, md: 6 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={4}
        size="md"
        borderRadius="full"
        bg="rgba(7,14,25,0.44)"
        color="white"
        border="1px solid rgba(255,255,255,0.15)"
        backdropFilter="blur(8px)"
        _hover={{ bg: 'rgba(47,115,246,0.68)', borderColor: 'brand.300' }}
        onClick={() => {
          next();
          resetTimer();
        }}
      />

      <HStack
        position="absolute"
        bottom={6}
        left="50%"
        transform="translateX(-50%)"
        zIndex={4}
        spacing={1.5}
      >
        {games.map((_, i) => (
          <Box
            key={i}
            as="button"
            onClick={() => {
              goTo(i, i > current ? 'next' : 'prev');
              resetTimer();
            }}
            width={i === current ? '28px' : '8px'}
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
    </Box>
  );
};

export default HeroSection;
