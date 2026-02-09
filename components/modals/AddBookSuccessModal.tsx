//components/modals/AddBookSuccessModal.tsx

import Image from 'next/image';
import { Book } from '@/types';
import Modal from '@/components/ui/Modal';

interface AddBookSuccessModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookSuccessModal({
  book,
  isOpen,
  onClose,
}: AddBookSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[350px]">
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="mb-4 text-5xl">✅</div>

        {/* Message */}
        <h3 className="mb-2 text-xl font-bold text-[#f9f9f9]">Good job!</h3>
        <p className="mb-6 text-sm text-[#686868]">
          Your book is now in{' '}
          <span className="text-[#f9f9f9]">the library!</span> The joy knows no
          bounds and now you can start your training.
        </p>

        {/* Book Preview */}
        <div className="flex items-center gap-3 rounded-lg bg-[#262626] p-3">
          <div className="relative h-[60px] w-[40px] overflow-hidden rounded">
            <Image
              src={book.imageUrl}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-[#f9f9f9]">{book.title}</p>
            <p className="text-xs text-[#686868]">{book.author}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}