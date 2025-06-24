import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Spinner,
  Box,
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
  released: string;
  publishers: { name: string }[];
  genres: { name: string }[];
}

const GameModal = ({ game, isOpen, onClose }: Props) => {
  const [gameDetails, setGameDetails] = useState<GameDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
        setError('Error loading game details');
        setIsLoading(false);
      });
  }, [game.id, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{game.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {isLoading ? (
            <VStack py={10}>
              <Spinner />
            </VStack>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : gameDetails ? (
            <VStack align="stretch" spacing={4}>
              <Image
                src={getCroppedImageUrl(game.background_image)}
                borderRadius="md"
                objectFit="cover"
                height="300px"
              />

              <HStack justify="space-between" wrap="wrap" gap={2}>
                <PlatformIconList
                  platforms={game.parent_platforms.map((p) => p.platform)}
                />
                <CriticScore score={game.metacritic} />
              </HStack>

              {gameDetails.released && (
                <Text color="gray.500">
                  Released:{' '}
                  {new Date(gameDetails.released).toLocaleDateString()}
                </Text>
              )}

              {gameDetails.publishers?.length > 0 && (
                <HStack>
                  <Text color="gray.500">Publishers:</Text>
                  {gameDetails.publishers.map((publisher) => (
                    <Badge key={publisher.name} colorScheme="green">
                      {publisher.name}
                    </Badge>
                  ))}
                </HStack>
              )}

              {gameDetails.genres?.length > 0 && (
                <HStack>
                  <Text color="gray.500">Genres:</Text>
                  {gameDetails.genres.map((genre) => (
                    <Badge key={genre.name} colorScheme="blue">
                      {genre.name}
                    </Badge>
                  ))}
                </HStack>
              )}

              {gameDetails.website && (
                <Text>
                  <Text as="span" color="gray.500">
                    Website:{' '}
                  </Text>
                  <a
                    href={gameDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--chakra-colors-blue-500)' }}
                  >
                    {gameDetails.website}
                  </a>
                </Text>
              )}

              {gameDetails.description_raw && (
                <Box>
                  <Text color="gray.500" mb={2}>
                    Description:
                  </Text>
                  <Text whiteSpace="pre-wrap">
                    {gameDetails.description_raw}
                  </Text>
                </Box>
              )}
            </VStack>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GameModal;
