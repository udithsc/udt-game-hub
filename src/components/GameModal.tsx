import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Spinner,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Game } from '../hooks/useGames';
import apiClient from '../services/api-client';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';
import getCroppedImageUrl from '../services/image-url';

interface Props {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

interface GameDetails extends Game {
  description_raw: string;
  website: string;
  publishers: { name: string }[];
}

const GameModal = ({ game, isOpen, onClose }: Props) => {
  const [gameDetails, setGameDetails] = useState<GameDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const labelColor = useColorModeValue('gray.500', 'gray.400');
  const dividerColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const descriptionColor = useColorModeValue('gray.700', 'gray.300');

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    apiClient
      .get<GameDetails>(`/games/${game.id}`)
      .then((res) => {
        setGameDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Error loading game details: ' + err);
        setIsLoading(false);
      });
  }, [game.id, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          borderRadius="full"
          size="sm"
          top={3}
          right={3}
          zIndex={10}
        />
        <ModalBody p={0}>
          {isLoading ? (
            <VStack py={16}>
              <Spinner color="brand.400" size="lg" />
              <Text fontSize="sm" color={labelColor} mt={2}>
                Loading details...
              </Text>
            </VStack>
          ) : error ? (
            <Box p={6}>
              <Text color="red.400">{error}</Text>
            </Box>
          ) : gameDetails ? (
            <VStack align="stretch" spacing={0}>
              {/* Hero image */}
              <Box position="relative" height="280px">
                <Image
                  src={getCroppedImageUrl(game.background_image)}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  height="50%"
                  bgGradient="linear(to-t, var(--chakra-colors-gray-900), transparent)"
                />
                <Box position="absolute" bottom={4} left={5} right={5}>
                  <Text fontSize="2xl" fontWeight="800" color="white" lineHeight="1.2">
                    {game.name}
                  </Text>
                </Box>
              </Box>

              {/* Content */}
              <VStack align="stretch" spacing={4} p={5}>
                <HStack justify="space-between" wrap="wrap" gap={2}>
                  <PlatformIconList
                    platforms={game.parent_platforms.map((p) => p.platform)}
                  />
                  <CriticScore score={game.metacritic} />
                </HStack>

                {gameDetails.released && (
                  <HStack>
                    <Text fontSize="xs" color={labelColor} fontWeight="600" textTransform="uppercase" letterSpacing="0.08em">
                      Released
                    </Text>
                    <Text fontSize="sm">
                      {new Date(gameDetails.released).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </HStack>
                )}

                {gameDetails.publishers?.length > 0 && (
                  <HStack wrap="wrap" gap={2}>
                    <Text fontSize="xs" color={labelColor} fontWeight="600" textTransform="uppercase" letterSpacing="0.08em">
                      Publishers
                    </Text>
                    {gameDetails.publishers.map((publisher) => (
                      <Badge
                        key={publisher.name}
                        bg="brand.500"
                        color="white"
                        borderRadius="full"
                        px={2.5}
                        py={0.5}
                        fontSize="xs"
                        fontWeight="600"
                      >
                        {publisher.name}
                      </Badge>
                    ))}
                  </HStack>
                )}

                {gameDetails.genres?.length > 0 && (
                  <HStack wrap="wrap" gap={2}>
                    <Text fontSize="xs" color={labelColor} fontWeight="600" textTransform="uppercase" letterSpacing="0.08em">
                      Genres
                    </Text>
                    {gameDetails.genres.map((genre) => (
                      <Badge
                        key={genre.name}
                        bg="whiteAlpha.100"
                        color="inherit"
                        borderRadius="full"
                        px={2.5}
                        py={0.5}
                        fontSize="xs"
                        fontWeight="500"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </HStack>
                )}

                {gameDetails.website && (
                  <HStack>
                    <Text fontSize="xs" color={labelColor} fontWeight="600" textTransform="uppercase" letterSpacing="0.08em">
                      Website
                    </Text>
                    <Text fontSize="sm">
                      <a
                        href={gameDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--chakra-colors-brand-400)' }}
                      >
                        {gameDetails.website}
                      </a>
                    </Text>
                  </HStack>
                )}

                {gameDetails.description_raw && (
                  <Box
                    borderTop="1px solid"
                    borderColor={dividerColor}
                    pt={4}
                    mt={1}
                  >
                    <Text
                      fontSize="xs"
                      color={labelColor}
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="0.08em"
                      mb={2}
                    >
                      About
                    </Text>
                    <Text
                      fontSize="sm"
                      whiteSpace="pre-wrap"
                      lineHeight="1.7"
                      color={descriptionColor}
                      noOfLines={12}
                    >
                      {gameDetails.description_raw}
                    </Text>
                  </Box>
                )}
              </VStack>
            </VStack>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GameModal;
