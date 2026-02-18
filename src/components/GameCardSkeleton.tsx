import {
  Card,
  CardBody,
  Skeleton,
  Box,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

const GameCardSkeleton = () => {
  const bg = useColorModeValue('white', '#12152a');
  const borderColor = useColorModeValue(
    'rgba(0, 0, 0, 0.06)',
    'rgba(255, 255, 255, 0.04)'
  );

  return (
    <Card
      bg={bg}
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor={borderColor}
      height="100%"
    >
      <Skeleton height="190px" startColor="gray.800" endColor="gray.700" />
      <CardBody p={3.5}>
        {/* Title */}
        <Skeleton height="16px" width="85%" mb={2} borderRadius="md" />
        <Skeleton height="14px" width="55%" mb={3} borderRadius="md" />

        {/* Platform icons row */}
        <HStack spacing={2} mb={3}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="14px" width="14px" borderRadius="sm" />
          ))}
        </HStack>

        {/* Divider */}
        <Box borderTop="1px solid" borderColor={borderColor} mb={3} />

        {/* Meta row */}
        <HStack justifyContent="space-between">
          <Skeleton height="12px" width="60px" borderRadius="md" />
          <HStack spacing={2}>
            <Skeleton height="12px" width="30px" borderRadius="md" />
            <Skeleton height="12px" width="35px" borderRadius="md" />
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
