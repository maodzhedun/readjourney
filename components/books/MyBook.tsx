//components/books/MyBook.tsx

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Book } from '@/types';

interface MyBookProps {
  book: Book;
  onRemove: () => void;
  onStartReading: () => void;
  isRemoving?: boolean;
}

export default function MyBook({
  book,
  onRemove,
  onStartReading,
  isRemoving,
}: MyBookProps) {
  // Define the status colour
  const getStatusColor = () => {
    switch (book.status) {
      case 'done':
        return 'bg-[#30b94d]';
      case 'in-progress':
        return 'bg-[#4f92f7]';
      default:
        return 'bg-[#686868]';
    }
  };

  return (
    <div className="group relative">
      {/* Book Cover */}
      <div
        className="relative mb-2 aspect-[137/208] cursor-pointer overflow-hidden rounded-lg bg-[#262626]"
        onClick={onStartReading}
      >
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 137px, 180px"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Book Info */}
      <h3 className="truncate text-sm font-bold text-[#f9f9f9]">
        {book.title}
      </h3>
      <p className="truncate text-xs text-[#686868]">{book.author}</p>

      {/* Status & Delete Row */}
      <div className="mt-2 flex items-center justify-between">
        {/* Status Indicator */}
        <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor()}`} />

        {/* Delete Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          disabled={isRemoving}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e90516]/30 text-[#e90516] transition-colors hover:bg-[#e90516]/10 disabled:opacity-50"
          aria-label="Delete book"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}