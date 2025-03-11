// src/hooks/usePagination.ts
import { useState, useEffect } from "react";

interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

export function usePagination<T>(data: T[], options: PaginationOptions = {}) {
  const {
    initialPage = 1,
    initialPageSize = 10,
    pageSizeOptions = [5, 10, 20, 50],
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Reset to first page when data changes
  useEffect(() => {
    if (currentPage > 1 && data.length === 0) {
      setCurrentPage(1);
    }
  }, [data, currentPage]);

  // Calculate pagination indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  // Get current page data
  const currentData = data.slice(startIndex, endIndex);

  // Change page
  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Change page size and reset to first page
  const changePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    currentData,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    changePage,
    changePageSize,
    pageSizeOptions,
  };
}
