// src/hooks/useFilteredData.ts
import { useState, useMemo } from "react";

interface FilterOptions<T> {
  searchFields?: (keyof T)[];
  initialFilters?: Record<string, any>;
}

export function useFilteredData<T extends Record<string, any>>(
  data: T[],
  options: FilterOptions<T> = {}
) {
  const { searchFields = [], initialFilters = {} } = options;

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Apply search filter
      if (searchTerm && searchFields.length > 0) {
        const searchMatches = searchFields.some((field) => {
          const value = item[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });

        if (!searchMatches) return false;
      }

      // Apply other filters
      for (const [key, value] of Object.entries(filters)) {
        if (
          value === undefined ||
          value === null ||
          value === "all" ||
          value === ""
        )
          continue;

        if (item[key] !== value) return false;
      }

      return true;
    });
  }, [data, searchTerm, filters, searchFields]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters(initialFilters);
  };

  return {
    filteredData,
    searchTerm,
    filters,
    handleSearchChange,
    handleFilterChange,
    resetFilters,
  };
}
