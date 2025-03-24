import { ReactNode, useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  FlexProps,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterBarProps extends Omit<FlexProps, "onChange"> {
  onSearch?: (searchTerm: string) => void;
  onFilterChange?: (filterName: string, value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    name: string;
    placeholder: string;
    options: FilterOption[];
  }[];
  defaultSearchTerm?: string;
  rightContent?: ReactNode;
}

/**
 * SearchFilterBar component providing a consistent search and filter interface
 * Used across list/table views for filtering data
 */
const SearchFilterBar = ({
  onSearch,
  onFilterChange,
  searchPlaceholder = "Search...",
  filters = [],
  defaultSearchTerm = "",
  rightContent,
  ...flexProps
}: SearchFilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle filter select change
  const handleFilterChange =
    (filterName: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onFilterChange) {
        onFilterChange(filterName, e.target.value);
      }
    };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      mb={6}
      gap={4}
      align={{ base: "stretch", md: "center" }}
      justify="space-between"
      {...flexProps}
    >
      <Flex flex={{ md: 1 }} gap={4} direction={{ base: "column", sm: "row" }}>
        <InputGroup maxW={{ md: "320px" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>

        {filters.map((filter, index) => (
          <Select
            key={index}
            placeholder={filter.placeholder}
            onChange={handleFilterChange(filter.name)}
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ))}
      </Flex>

      {rightContent && <Flex justify="flex-end">{rightContent}</Flex>}
    </Flex>
  );
};

export default SearchFilterBar;
