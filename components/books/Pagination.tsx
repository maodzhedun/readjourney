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
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={clsx(
          'flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border transition-colors',
          canGoPrev
            ? 'border-[#f9f9f9]/20 text-[#f9f9f9] hover:bg-[#f9f9f9]/10'
            : 'cursor-not-allowed border-[#3e3e3e] text-[#3e3e3e]'
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      {/* Page Info */}
      <span className="min-w-[60px] text-center text-sm text-[#f9f9f9]">
        {currentPage} / {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={clsx(
          'flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border transition-colors',
          canGoNext
            ? 'border-[#f9f9f9]/20 text-[#f9f9f9] hover:bg-[#f9f9f9]/10'
            : 'cursor-not-allowed border-[#3e3e3e] text-[#3e3e3e]'
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
}
