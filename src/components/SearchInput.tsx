import { useRef } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const iconColor = useColorModeValue('gray.400', 'gray.500');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <form
      style={{ width: '100%' }}
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <BsSearch color={iconColor} />
        </InputLeftElement>
        <Input
          ref={ref}
          borderRadius="full"
          placeholder="Search games..."
          variant="filled"
          _placeholder={{ color: placeholderColor }}
          fontSize="sm"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
