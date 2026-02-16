//components/modals/BookFinishedModal.tsx

'use client';

import Image from 'next/image';
import Modal from '@/components/ui/Modal';

interface BookFinishedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookFinishedModal({
  isOpen,
  onClose,
}: BookFinishedModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[342px]">
      <div className="flex flex-col items-center text-center">
        {/* Book Stack Icon */}
        <div className="mb-8">
          <Image
            src="/books-stack.svg"
            alt="Books"
            width={68}
            height={70}
          />
        </div>

        {/* Title */}
        <h3
          className="mb-4 font-bold text-[#f9f9f9]"
          style={{ fontSize: '20px' }}
        >
          The book is read
        </h3>

        {/* Description */}
        <p
          className="text-[#686868]"
          style={{ fontSize: '14px', lineHeight: '1.5' }}
        >
          It was an{' '}
          <span className="text-[#f9f9f9]">exciting journey</span>
          , where each page revealed new horizons, and the characters became
          inseparable friends.
        </p>
      </div>
    </Modal>
  );
}
