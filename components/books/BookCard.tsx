//components/books/BookCard.tsx

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
    // w-full 
    <div
      className="group cursor-pointer w-full"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? e => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Book Cover — aspect-ratio 137:208  */}
      <div
        className="relative overflow-hidden rounded-[8px] bg-[#262626] w-full"
        style={{ aspectRatio: '137 / 208', marginBottom: '8px' }}
      >
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
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
            className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#e90516]/80 opacity-0 transition-opacity hover:bg-[#e90516] group-hover:opacity-100"
            aria-label="Delete book"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 32 32"
              className="stroke-white"
              fill="none"
            >
              <use href="/sprite.svg#icon-trash" />
            </svg>
          </button>
        )}
      </div>

      {/* Book Info */}
      <h3
        className="truncate font-bold text-[#f9f9f9]"
        style={{ fontSize: '14px', marginBottom: '2px' }}
      >
        {book.title}
      </h3>
      <p className="truncate text-[#686868]" style={{ fontSize: '10px' }}>
        {book.author}
      </p>

      {/* Status Badge */}
      {showStatus && book.status && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className="rounded-full"
            style={{
              width: '10px',
              height: '10px',
              backgroundColor:
                book.status === 'done'
                  ? '#30b94d'
                  : book.status === 'in-progress'
                    ? '#4f92f7'
                    : '#686868',
            }}
          />
        </div>
      )}
    </div>
  );
}
