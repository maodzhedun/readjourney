import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center" style={{ gap: '8px' }}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={clsx(
          'flex items-center justify-center rounded-full border transition-colors',
          canGoPrev
            ? 'border-[#f9f9f9]/20 text-[#f9f9f9] hover:border-[#f9f9f9]'
            : 'cursor-not-allowed border-[#3e3e3e] text-[#3e3e3e]'
        )}
        style={{ width: '32px', height: '32px' }}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Info */}
      <span
        className="text-center text-[#f9f9f9]"
        style={{ fontSize: '14px', minWidth: '40px' }}
      >
        {currentPage} / {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={clsx(
          'flex items-center justify-center rounded-full border transition-colors',
          canGoNext
            ? 'border-[#f9f9f9]/20 text-[#f9f9f9] hover:border-[#f9f9f9]'
            : 'cursor-not-allowed border-[#3e3e3e] text-[#3e3e3e]'
        )}
        style={{ width: '32px', height: '32px' }}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
