import { Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { GameQuery } from '../App';

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const platform = gameQuery.platform?.name || '';
  const genre = gameQuery.genre?.name || '';
  const hasSearch = gameQuery.searchText.trim().length > 0;
  const heading = hasSearch
    ? `Search results for "${gameQuery.searchText.trim()}"`
    : `${platform} ${genre} Games`.trim() || 'Discover Games';
  const subtitleColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <VStack align="start" spacing={1}>
      <Heading
        as="h1"
        fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
        fontWeight="700"
        letterSpacing="-0.05em"
        lineHeight="0.98"
      >
        {heading}
      </Heading>
      <Text fontSize={{ base: 'sm', md: 'md' }} color={subtitleColor} maxW="2xl">
        Explore beautifully presented game picks, refined by genre, platform,
        and live search so the catalog feels fast to browse.
      </Text>
    </VStack>
  );
};

export default GameHeading;
