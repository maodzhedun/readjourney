//components/modals/BookFinishedModal.tsx

'use client';

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[342px]"
      borderRadius={30}
      background="#141414"
    >
      <div className="flex flex-col items-center text-center">
        <div style={{ marginBottom: '32px' }}>
          <img
            src="/images/books@1x.webp"
            srcSet="/images/books@1x.webp 1x, /images/books@2x.webp 2x"
            alt="Book finished"
            width={80}
            height={80}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Title */}
        <h3
          className="font-bold text-[#f9f9f9]"
          style={{ fontSize: '20px', marginBottom: '16px' }}
        >
          The book is read
        </h3>

        {/* Description */}
        <p
          className="text-[#686868]"
          style={{ fontSize: '14px', lineHeight: '1.57' }}
        >
          It was an{' '}
          <span className="font-bold italic text-[#f9f9f9]">
            exciting journey
          </span>
          , where each page revealed new horizons, and the characters became
          inseparable friends.
        </p>
      </div>
    </Modal>
  );
}
