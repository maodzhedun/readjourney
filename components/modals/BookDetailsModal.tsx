'use client';

import Image from 'next/image';
import { useAddBookById } from '@/hooks/useBooks';
import { Book } from '@/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface BookDetailsModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailsModal({
  book,
  isOpen,
  onClose,
}: BookDetailsModalProps) {
  const { mutate: addBook, isPending } = useAddBookById();

  const handleAddToLibrary = () => {
    addBook(book._id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px]">
      <div className="flex flex-col items-center text-center">
        {/* Book Cover */}
        <div className="relative mb-4 h-[208px] w-[140px] overflow-hidden rounded-lg bg-[#262626]">
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Book Info */}
        <h3 className="mb-1 text-xl font-bold text-[#f9f9f9]">{book.title}</h3>
        <p className="mb-1 text-sm text-[#686868]">{book.author}</p>
        <p className="mb-6 text-sm text-[#686868]">{book.totalPages} pages</p>

        {/* Add to Library Button */}
        <Button onClick={handleAddToLibrary} isLoading={isPending}>
          Add to library
        </Button>
      </div>
    </Modal>
  );
}
