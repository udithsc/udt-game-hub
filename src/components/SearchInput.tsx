import { useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

interface Props {
  value?: string;
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ value = '', onSearch }: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const iconColor = useColorModeValue('gray.400', 'gray.500');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <form
      style={{ width: '100%' }}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(inputValue.trim());
      }}
    >
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <BsSearch color={iconColor} />
        </InputLeftElement>
        <Input
          borderRadius="full"
          placeholder="Search games..."
          variant="filled"
          _placeholder={{ color: placeholderColor }}
          fontSize="sm"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
