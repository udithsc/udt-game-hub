import { Heading, Text, HStack, useColorModeValue } from '@chakra-ui/react';
import { GameQuery } from '../App';

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const platform = gameQuery.platform?.name || '';
  const genre = gameQuery.genre?.name || '';
  const heading = `${platform} ${genre} Games`.trim();
  const subtitleColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <>
      <Heading
        as="h1"
        fontSize={{ base: '3xl', md: '4xl' }}
        fontWeight="800"
        letterSpacing="-0.03em"
        lineHeight="1.1"
        mt={6}
        mb={1}
      >
        {heading}
      </Heading>
      <Text fontSize="sm" color={subtitleColor} mb={5}>
        Discover and explore the best titles
      </Text>
    </>
  );
};

export default GameHeading;
