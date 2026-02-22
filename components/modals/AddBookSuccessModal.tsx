//components/modals/AddBookSuccessModal.tsx

'use client';

import Modal from '@/components/ui/Modal';

interface AddBookSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookSuccessModal({
  isOpen,
  onClose,
}: AddBookSuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[342px] max-w-[calc(100vw-32px)]"
    >
      <div className="flex flex-col items-center text-center">
        {/* Ok Hand Image */}
        <div style={{ marginBottom: '32px' }}>
          <picture>
            <source
              srcSet="/images/ok_hand@1x.webp 1x, /images/ok_hand@2x.webp 2x"
              type="image/webp"
            />
            <img
              src="/images/ok_hand@1x.webp"
              alt="Good job"
              width={50}
              height={50}
            />
          </picture>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-[#f9f9f9]"
          style={{ fontSize: '20px', marginBottom: '14px' }}
        >
          Good job
        </h3>

        {/* Message */}
        <p
          className="text-[#686868]"
          style={{ fontSize: '14px', lineHeight: '1.5' }}
        >
          Your book is now in{' '}
          <span className="text-[#f9f9f9]">the library!</span> The joy knows no
          bounds and now you can start your training
        </p>
      </div>
    </Modal>
  );
}
