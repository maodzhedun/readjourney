//components/modals/BookDetailsModal.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useAddBookById, useOwnBooks } from '@/hooks/useBooks';
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
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutateAsync: addBook, isPending } = useAddBookById();
  const { data: ownBooks } = useOwnBooks();

  // Check if book is already in library
  const isInLibrary = ownBooks?.some(
    ownBook => ownBook._id === book._id || ownBook.title === book.title
  );

  const handleAddToLibrary = async () => {
    if (isInLibrary) {
      toast.error('This book is already in your library!');
      return;
    }

    try {
      await addBook(book._id);
      setShowSuccess(true);
    } catch {
      // Error is handled in useAddBookById
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  // Show success modal
  if (showSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="flex flex-col items-center text-center">
          {/* Ok Hand Image */}
          <div style={{ marginBottom: '20px' }}>
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
            style={{ fontSize: '14px', maxWidth: '250px' }}
          >
            Your book is now in{' '}
            <span className="font-bold text-[#f9f9f9]">the library!</span> The
            joy knows no bounds and now you can start your training
          </p>
        </div>
      </Modal>
    );
  }

  // Show book details modal
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[500px] max-w-[calc(100vw-32px)]"
    >
      <div className="flex flex-col items-center text-center">
        {/* Book Cover - 137 × 248 px */}
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            width: '137px',
            height: '248px',
            marginBottom: '16px',
            backgroundColor: '#262626',
          }}
        >
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            sizes="137px"
            className="object-cover"
          />
        </div>

        {/* Book Info */}
        <h3
          className="font-bold"
          style={{ fontSize: '18px', color: '#f9f9f9', marginBottom: '4px' }}
        >
          {book.title}
        </h3>
        <p style={{ fontSize: '12px', color: '#686868', marginBottom: '4px' }}>
          {book.author}
        </p>
        <p style={{ fontSize: '12px', color: '#686868', marginBottom: '20px' }}>
          {book.totalPages} pages
        </p>

        {/* Add to Library Button */}
        {isInLibrary ? (
          <p
            style={{
              fontSize: '14px',
              color: '#30b94d',
              fontWeight: 500,
            }}
          >
            ✓ Already in your library
          </p>
        ) : (
          <Button onClick={handleAddToLibrary} isLoading={isPending}>
            Add to library
          </Button>
        )}
      </div>
    </Modal>
  );
}
