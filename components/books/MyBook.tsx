//components/books/MyBook.tsx

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
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
    <div className="transition-all duration-200 hover:scale-[1.02]">
      {/* Book Cover */}
      <div
        className="relative mb-2 aspect-[137/208] cursor-pointer overflow-hidden rounded-lg bg-[#262626]"
        onClick={onStartReading}
      >
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 767px) 137px, (max-width: 1439px) 153px, 180px"
          className="object-cover"
          priority={isPriority}
        />
      </div>

      {/* Book Info */}
      <h3 className="truncate text-sm font-bold text-[#f9f9f9]">
        {book.title}
      </h3>
      
      {/* Author & Delete Row */}
      <div className="flex items-end justify-between">
        <p className="truncate text-xs text-[#686868]">{book.author}</p>

        {/* Delete Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          disabled={isRemoving}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#686868] text-[#686868] transition-all duration-200 hover:border-[#e85050] hover:bg-[rgba(232,80,80,0.1)] hover:text-[#e85050] disabled:opacity-50"
          aria-label="Delete book"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
