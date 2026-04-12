import { HStack, Icon, Tooltip, useColorModeValue } from '@chakra-ui/react';
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
  FaGamepad,
} from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';
import { BsGlobe } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { Platform } from '../hooks/usePlatforms';

interface Props {
  platforms: Platform[];
}

const iconMap: { [key: string]: { icon: IconType; label: string } } = {
  pc: { icon: FaWindows, label: 'PC' },
  playstation: { icon: FaPlaystation, label: 'PlayStation' },
  xbox: { icon: FaXbox, label: 'Xbox' },
  nintendo: { icon: FaGamepad, label: 'Nintendo' },
  mac: { icon: FaApple, label: 'macOS' },
  linux: { icon: FaLinux, label: 'Linux' },
  android: { icon: FaAndroid, label: 'Android' },
  ios: { icon: MdPhoneIphone, label: 'iOS' },
  web: { icon: BsGlobe, label: 'Web' },
};

const PlatformIconList = ({ platforms }: Props) => {
  const iconColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <HStack spacing={2} flexWrap="wrap">
      {platforms.map((platform) => {
        const entry = iconMap[platform.slug];
        if (!entry) return null;
        return (
          <Tooltip
            key={platform.id}
            label={entry.label}
            fontSize="xs"
            hasArrow
            placement="top"
            openDelay={300}
          >
            <span>
              <Icon
                as={entry.icon}
                color={iconColor}
                boxSize="13px"
                transition="color 0.2s, transform 0.2s"
                _hover={{ color: 'brand.400', transform: 'scale(1.2)' }}
              />
            </span>
          </Tooltip>
        );
      })}
    </HStack>
  );
};

export default PlatformIconList;
