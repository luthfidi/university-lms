// src/hooks/useSort.ts
import { useState, useMemo } from "react";

type SortDirection = "asc" | "desc";

interface SortOptions<T> {
  initialSortField?: keyof T;
  initialSortDirection?: SortDirection;
}

export function useSort<T extends Record<string, any>>(
  data: T[],
  options: SortOptions<T> = {}
) {
  const { initialSortField, initialSortDirection = "asc" } = options;

  const [sortField, setSortField] = useState<keyof T | undefined>(
    initialSortField
  );
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialSortDirection);

  const sortedData = useMemo(() => {
    if (!sortField) return [...data];

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue === bValue) return 0;

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // Sort strings case-insensitively
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Sort numbers and other types
      return sortDirection === "asc"
        ? aValue < bValue
          ? -1
          : 1
        : aValue < bValue
          ? 1
          : -1;
    });
  }, [data, sortField, sortDirection]);

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // New field, set to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return {
    sortedData,
    sortField,
    sortDirection,
    handleSort,
  };
}
