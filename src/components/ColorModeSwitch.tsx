import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const color = useColorModeValue('gray.700', 'white');

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      borderRadius="full"
      color={color}
    />
  );
};

export default ColorModeSwitch;
