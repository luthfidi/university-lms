import { ReactNode } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Flex,
  useColorModeValue,
  TableProps,
} from "@chakra-ui/react";

export interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, item: any) => ReactNode;
  width?: string | number;
}

interface DataTableProps extends Omit<TableProps, "children"> {
  columns: Column[];
  data: any[];
  emptyText?: string;
  isLoading?: boolean;
  onRowClick?: (item: any) => void;
}

/**
 * DataTable component for displaying tabular data with consistent styling
 * Supports custom cell renderers and row click handlers
 */
const DataTable = ({
  columns,
  data,
  emptyText = "No data available",
  isLoading = false,
  onRowClick,
  ...tableProps
}: DataTableProps) => {
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  if (data.length === 0) {
    return (
      <Flex
        justify="center"
        align="center"
        p={10}
        borderWidth="1px"
        borderRadius="md"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Text color="gray.500">{emptyText}</Text>
      </Flex>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple" {...tableProps}>
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index} width={column.width}>
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, rowIndex) => (
            <Tr
              key={rowIndex}
              cursor={onRowClick ? "pointer" : undefined}
              _hover={onRowClick ? { bg: hoverBg } : undefined}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column, colIndex) => (
                <Td key={`${rowIndex}-${colIndex}`}>
                  {column.cell
                    ? column.cell(item[column.accessor], item)
                    : item[column.accessor]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
