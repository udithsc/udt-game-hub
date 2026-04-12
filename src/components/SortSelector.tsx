import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { FaSlidersH } from 'react-icons/fa';

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const sortOrders = [
    { value: '', label: 'Relevance' },
    { value: '-added', label: 'Date added' },
    { value: 'name', label: 'Name' },
    { value: '-released', label: 'Release date' },
    { value: '-metacritic', label: 'Popularity' },
    { value: '-rating', label: 'Average rating' },
  ];

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  const btnColor = useColorModeValue('gray.700', 'white');

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        variant="ghost"
        color={btnColor}
        borderRadius="full"
        size="md"
        fontWeight="700"
        px={5}
        h="52px"
        minW={{ base: '100%', md: '200px' }}
      >
        <HStack spacing={3}>
          <FaSlidersH />
          <Text>{currentSortOrder?.label || 'Relevance'}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => onSelectSortOrder(order.value)}
            key={order.value}
            fontSize="sm"
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
