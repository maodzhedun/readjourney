//components/modals/BookFinishedModal.tsx

'use client';

import Link from 'next/link';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface BookFinishedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookFinishedModal({
  isOpen,
  onClose,
}: BookFinishedModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[400px]">
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="mb-4 text-6xl">🎉</div>

        {/* Message */}
        <h3 className="mb-2 text-xl font-bold text-[#f9f9f9]">
          Congratulations!
        </h3>
        <p className="mb-2 text-sm text-[#686868]">
          You have finished reading the book!
        </p>
        <p className="mb-6 text-sm text-[#686868]">
          Great job staying consistent with your reading goals.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/library">
            <Button variant="outline">Back to Library</Button>
          </Link>
          <Button onClick={onClose}>Continue</Button>
        </div>
      </div>
    </Modal>
  );
}