import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      borderRadius="lg"
      _hover={{ bg: hoverBg }}
    />
  );
};

export default ColorModeSwitch;
