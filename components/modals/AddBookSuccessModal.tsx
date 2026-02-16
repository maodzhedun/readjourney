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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        {/* Thumbs Up Emoji */}
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>👍</div>

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
          style={{ fontSize: '14px', maxWidth: '250px' }}
        >
          Your book is now in{' '}
          <span className="font-bold text-[#f9f9f9]">the library!</span> The joy
          knows no bounds and now you can start your training
        </p>
      </div>
    </Modal>
  );
}
