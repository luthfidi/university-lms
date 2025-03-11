// src/components/composite/SearchFilter.tsx
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Select,
  FlexProps,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, RepeatIcon } from "@chakra-ui/icons";
import ContentCard from "@/components/atomic/cards/ContentCard";
import { ReactNode } from "react";

export interface FilterOption {
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

interface SearchFilterProps extends FlexProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  filters?: FilterOption[];
  showReset?: boolean;
  onReset?: () => void;
  isInCard?: boolean;
  actions?: ReactNode;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm = "",
  onSearchChange,
  filters = [],
  showReset = true,
  onReset,
  isInCard = true,
  actions,
  ...rest
}) => {
  const filterContent = (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={4}
      align={{ base: "stretch", md: "center" }}
      {...rest}
    >
      {onSearchChange && (
        <InputGroup maxW={{ md: "320px" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      )}

      <Flex
        flex={{ md: 1 }}
        gap={4}
        direction={{ base: "column", sm: "row" }}
        wrap="wrap"
      >
        {filters.map((filter, index) => (
          <Select
            key={index}
            placeholder={filter.placeholder || `All ${filter.name}`}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            maxW="220px"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ))}

        {showReset && onReset && (
          <IconButton
            aria-label="Reset filters"
            icon={<RepeatIcon />}
            onClick={onReset}
            variant="ghost"
            alignSelf={{ base: "flex-start", sm: "center" }}
          />
        )}

        {actions && <Box ml={{ md: "auto" }}>{actions}</Box>}
      </Flex>
    </Flex>
  );

  if (isInCard) {
    return <ContentCard>{filterContent}</ContentCard>;
  }

  return filterContent;
};

export default SearchFilter;
