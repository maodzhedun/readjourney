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
            ? 'border-[#f9f9f9]/20 hover:border-[#f9f9f9]'
            : 'cursor-not-allowed border-[#3e3e3e]'
        )}
        style={{ width: '40px', height: '40px' }}
        aria-label="Previous page"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 32 32"
          className={clsx(
            'fill-none',
            canGoPrev ? 'stroke-[#f9f9f9]' : 'stroke-[#3e3e3e]'
          )}
        >
          <use href="/sprite.svg#icon-chevron-left" />
        </svg>
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
            ? 'border-[#f9f9f9]/20 hover:border-[#f9f9f9]'
            : 'cursor-not-allowed border-[#3e3e3e]'
        )}
        style={{ width: '40px', height: '40px' }}
        aria-label="Next page"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 32 32"
          className={clsx(
            'fill-none',
            canGoNext ? 'stroke-[#f9f9f9]' : 'stroke-[#3e3e3e]'
          )}
        >
          <use href="/sprite.svg#icon-chevron-right" />
        </svg>
      </button>
    </div>
  );
}
