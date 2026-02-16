//components/modals/StartReadingModal.tsx

'use client';

import Image from 'next/image';
import { Book } from '@/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface StartReadingModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onStartReading: () => void;
}

export default function StartReadingModal({
  book,
  isOpen,
  onClose,
  onStartReading,
}: StartReadingModalProps) {
  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        {/* Book Cover */}
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            width: '140px',
            height: '208px',
            marginBottom: '16px',
            backgroundColor: '#262626',
          }}
        >
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            sizes="140px"
            className="object-cover"
          />
        </div>

        {/* Book Info */}
        <h3
          className="font-bold text-[#f9f9f9]"
          style={{ fontSize: '18px', marginBottom: '4px' }}
        >
          {book.title}
        </h3>
        <p style={{ fontSize: '12px', color: '#686868', marginBottom: '4px' }}>
          {book.author}
        </p>
        <p style={{ fontSize: '12px', color: '#686868', marginBottom: '20px' }}>
          {book.totalPages} pages
        </p>

        {/* Start Reading Button */}
        <Button onClick={onStartReading}>
          Start reading
        </Button>
      </div>
    </Modal>
  );
}
