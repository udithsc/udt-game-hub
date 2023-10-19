import { HStack, Image, Show } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding={'10px'}>
      <Image src={logo} width={300} padding={3} />
      <Show above='lg'>
        <SearchInput onSearch={onSearch} />
      </Show>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
