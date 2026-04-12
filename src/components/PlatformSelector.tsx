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
import { FaLayerGroup } from 'react-icons/fa';
import usePlatforms from '../hooks/usePlatforms';
import { Platform } from '../hooks/usePlatforms';

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform: Platform | null;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
  const { data, error } = usePlatforms();
  const btnColor = useColorModeValue('gray.700', 'white');

  if (error) return null;

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
        minW={{ base: '100%', md: '220px' }}
      >
        <HStack spacing={3}>
          <FaLayerGroup />
          <Text>{selectedPlatform?.name || 'All platforms'}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        {data.map((platform) => (
          <MenuItem
            onClick={() => onSelectPlatform(platform)}
            key={platform.id}
            fontSize="sm"
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
