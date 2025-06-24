import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  useDisclosure,
  Text,
  VStack,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';
import getCroppedImageUrl from '../services/image-url';
import Emoji from './Emoji';
import GameModal from './GameModal';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <>
      <Card
        bg={bg}
        borderRadius="lg"
        overflow="hidden"
        onClick={onOpen}
        cursor="pointer"
        transition="all .2s ease-in-out"
        boxShadow="md"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: 'lg',
        }}
      >
        <Box position="relative">
          <Image
            src={getCroppedImageUrl(game.background_image)}
            height="200px"
            objectFit="cover"
            width="100%"
          />
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="rgba(0,0,0,0.6)"
            px={2}
            py={1}
            borderRadius="md"
          >
            <CriticScore score={game.metacritic} />
          </Box>
          <Box position="absolute" bottom={2} right={2}>
            <Emoji rating={game.rating_top} />
          </Box>
        </Box>
        <CardBody>
          <VStack align="start" spacing={3}>
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
            <Heading fontSize="xl" noOfLines={1} title={game.name}>
              {game.name}
            </Heading>
          </VStack>
        </CardBody>
      </Card>

      <GameModal game={game} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default GameCard;
