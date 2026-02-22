//components/books/MyBook.tsx

import Image from 'next/image';
import { Book } from '@/types';

interface MyBookProps {
  book: Book;
  onRemove: () => void;
  onStartReading: () => void;
  isRemoving?: boolean;
  isPriority?: boolean;
}

export default function MyBook({
  book,
  onRemove,
  onStartReading,
  isRemoving,
  isPriority,
}: MyBookProps) {
  return (
    <div style={{ width: '137px' }}>
      {/* Book Cover */}
      <div
        className="relative cursor-pointer overflow-hidden rounded-lg bg-[#262626]"
        style={{ width: '137px', height: '208px', marginBottom: '8px' }}
        onClick={onStartReading}
      >
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="137px"
          className="object-cover transition-transform hover:scale-105"
          priority={isPriority}
        />
      </div>

      {/* Book Title */}
      <h3
        className="truncate font-bold text-[#f9f9f9]"
        style={{ fontSize: '14px', marginBottom: '2px' }}
      >
        {book.title}
      </h3>

      {/* Author & Delete Row */}
      <div className="flex items-center justify-between">
        <p
          className="truncate text-[#686868]"
          style={{ fontSize: '10px', maxWidth: '100px' }}
        >
          {book.author}
        </p>

        {/* Delete Button - no border, just icon */}
        <button
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          disabled={isRemoving}
          className="group flex-shrink-0 p-1 transition-opacity hover:opacity-70 disabled:opacity-50"
          aria-label="Delete book"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 32 32"
            className="stroke-[#e85050]"
            fill="none"
          >
            <use href="/sprite.svg#icon-trash" />
          </svg>
        </button>
      </div>
    </div>
  );
}
