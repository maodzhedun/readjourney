//components/books/BookCard.tsx

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
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
      onKeyDown={onClick ? e => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Book Cover */}
      <div
        className="relative overflow-hidden rounded-[8px] bg-[#262626]"
        style={{
          width: '100%',
          aspectRatio: '137 / 208',
          marginBottom: '8px',
        }}
      >
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 767px) 137px, (max-width: 1279px) 137px, 137px"
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
            className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#e90516]/80 text-white opacity-0 transition-opacity hover:bg-[#e90516] group-hover:opacity-100"
            aria-label="Delete book"
          >
            <Trash2 size={14} />
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
      <p
        className="truncate text-[#686868]"
        style={{ fontSize: '10px' }}
      >
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
