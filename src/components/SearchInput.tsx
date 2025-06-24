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
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputHoverBg = useColorModeValue('gray.100', 'gray.600');
  const iconColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <form
      style={{ width: '100%' }}
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<BsSearch color={iconColor} />}
        />
        <Input
          ref={ref}
          borderRadius="full"
          placeholder="Search games..."
          variant="filled"
          bg={inputBg}
          _hover={{ bg: inputHoverBg }}
          _focus={{
            bg: inputBg,
            borderColor: 'blue.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
          }}
          fontSize="md"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
