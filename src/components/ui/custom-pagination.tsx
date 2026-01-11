import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './button';

interface CustomPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages.sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-sm text-gray-600">
        Showing <span className="font-bold">{endItem - startItem + 1}</span> from{' '}
        <span className="font-bold">{totalItems}</span> data
      </p>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronsLeft className="h-4 w-4 text-gray-600" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </Button>

        {pageNumbers.map((page, index) => {
          const isActive = page === currentPage;
          const isFirst = index === 0;
          const isLast = index === pageNumbers.length - 1;
          const showEllipsis = !isFirst && page - pageNumbers[index - 1] > 1;

          return (
            <React.Fragment key={page}>
              {showEllipsis && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`h-8 w-8 p-0 rounded-full cursor-pointer ${
                  isActive
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </Button>
            </React.Fragment>
          );
        })}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </Button>

        {/* Last page button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronsRight className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </div>
  );
};
