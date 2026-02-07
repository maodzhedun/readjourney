import Image from 'next/image';
import { Book } from '@/types';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  showStatus?: boolean;
  onDelete?: () => void;
  isPriority?: boolean;
}

export default function BookCard({
  book,
  onClick,
  showStatus,
  onDelete,
  isPriority,
}: BookCardProps) {
  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Book Cover */}
      <div className="relative mb-2 aspect-[137/208] overflow-hidden rounded-lg bg-[#262626]">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 137px, 180px"
          className="object-cover transition-transform group-hover:scale-105"
          priority={isPriority}
        />

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={e => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#e90516] text-white opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Delete book"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Book Info */}
      <h3 className="truncate text-sm font-bold text-[#f9f9f9]">
        {book.title}
      </h3>
      <p className="truncate text-xs text-[#686868]">{book.author}</p>

      {/* Status Badge */}
      {showStatus && book.status && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              book.status === 'done'
                ? 'bg-[#30b94d]'
                : book.status === 'in-progress'
                  ? 'bg-[#4f92f7]'
                  : 'bg-[#686868]'
            }`}
          />
        </div>
      )}
    </div>
  );
}
