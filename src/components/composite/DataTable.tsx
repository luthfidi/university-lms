// src/components/composite/DataTable.tsx
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableProps,
  Box,
  Text,
  Flex,
  IconButton,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { ReactNode } from "react";
import EmptyState from "@/components/atomic/feedback/EmptyState";

export interface Column<T extends Record<string, any>> {
  header: string;
  accessor: keyof T | string;
  cell?: (item: T) => ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T extends Record<string, any>> extends TableProps {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyState?: {
    title: string;
    message: string;
    icon?: any;
  };
  sortable?: boolean;
  sortField?: keyof T;
  sortDirection?: "asc" | "desc";
  onSort?: (field: keyof T) => void;
  pagination?: {
    pageSize: number;
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    pageSizeOptions?: number[];
  };
  onRowClick?: (item: T) => void;
  hoverable?: boolean;
}

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  emptyState,
  sortable = false,
  sortField,
  sortDirection,
  onSort,
  pagination,
  onRowClick,
  hoverable = false,
  ...rest
}: DataTableProps<T>) {

  // Helper to resolve the value from a record
  const getValue = (item: T, accessor: string | keyof T): any => {
    if (typeof accessor === "string" && accessor.includes(".")) {
      return accessor.split(".").reduce((acc, part) => acc?.[part], item);
    }

    return item[accessor];
  };

  // Helper to render pagination
  const renderPagination = () => {
    if (!pagination) return null;

    const {
      pageSize,
      currentPage,
      totalItems,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [5, 10, 20, 50],
    } = pagination;

    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
      <Flex
        mt={4}
        justify="space-between"
        align="center"
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
      >
        <Flex align="center">
          <Text fontSize="sm">
            Showing {totalItems === 0 ? 0 : startItem}-{endItem} of {totalItems}{" "}
            items
          </Text>
          <Select
            ml={4}
            size="sm"
            width="auto"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </Select>
        </Flex>

        <HStack>
          <IconButton
            aria-label="Previous page"
            icon={<ChevronLeftIcon />}
            isDisabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            size="sm"
          />

          <NumberInput
            size="sm"
            maxW={20}
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(_, value) => {
              if (value >= 1 && value <= totalPages) {
                onPageChange(value);
              }
            }}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Text fontSize="sm">of {totalPages}</Text>

          <IconButton
            aria-label="Next page"
            icon={<ChevronRightIcon />}
            isDisabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            size="sm"
          />
        </HStack>
      </Flex>
    );
  };

  if (data.length === 0 && !isLoading && emptyState) {
    return (
      <Box>
        <EmptyState
          title={emptyState.title}
          message={emptyState.message}
          icon={emptyState.icon}
        />
        {pagination && renderPagination()}
      </Box>
    );
  }

  return (
    <Box>
      <Box overflowX="auto">
        <Table {...rest}>
          <Thead>
            <Tr>
              {columns.map((column, i) => (
                <Th
                  key={i}
                  onClick={
                    sortable && column.sortable && onSort
                      ? () => onSort(column.accessor as keyof T)
                      : undefined
                  }
                  cursor={
                    sortable && column.sortable && onSort
                      ? "pointer"
                      : "default"
                  }
                  width={column.width}
                  textAlign={column.align || "left"}
                >
                  <Flex align="center">
                    <Text>{column.header}</Text>
                    {sortable &&
                      column.sortable &&
                      sortField === column.accessor && (
                        <Box ml={1}>
                          {sortDirection === "asc" ? (
                            <TriangleUpIcon boxSize={3} />
                          ) : (
                            <TriangleDownIcon boxSize={3} />
                          )}
                        </Box>
                      )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, rowIndex) => (
              <Tr
                key={rowIndex}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                cursor={onRowClick ? "pointer" : "default"}
                _hover={
                  hoverable || onRowClick
                    ? {
                        bg: "gray.50",
                        _dark: { bg: "gray.700" },
                      }
                    : undefined
                }
              >
                {columns.map((column, colIndex) => (
                  <Td key={colIndex} textAlign={column.align || "left"}>
                    {column.cell
                      ? column.cell(item)
                      : getValue(item, column.accessor)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {pagination && renderPagination()}
    </Box>
  );
}

export default DataTable;
