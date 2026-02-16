//app/(private)/library/LibraryClient.tsx

'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useOwnBooks, useRemoveBook } from '@/hooks/useBooks';
import { Book } from '@/types';
import { FILTER_OPTIONS } from '@/utils/constants';

import Dashboard from '@/components/Dashboard/Dashboard';
import AddBookForm from '@/components/forms/AddBookForm';
import RecommendedPreview from '@/components/Dashboard/RecommendedPreview';
import MyLibraryBooks from '@/components/books/MyLibraryBooks';
import AddBookSuccessModal from '@/components/modals/AddBookSuccessModal';
import StartReadingModal from '@/components/modals/StartReadingModal';
import Select from '@/components/ui/Select';
import Loader from '@/components/ui/Loader';

export default function LibraryClient() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  // Success modal state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Start reading modal state
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Library request
  const { data: books, isLoading, isFetching } = useOwnBooks(filter);

  // Deletion mutation
  const { mutate: removeBook, isPending: isRemoving } = useRemoveBook();

  // Handling successful book addition - show modal
  const handleAddSuccess = useCallback(() => {
    setIsSuccessModalOpen(true);
  }, []);

  // Close success modal
  const handleCloseSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false);
  }, []);

  // Open reading modal
  const handleBookClick = useCallback((book: Book) => {
    setSelectedBook(book);
    setIsReadingModalOpen(true);
  }, []);

  // Close reading modal
  const handleCloseReadingModal = useCallback(() => {
    setIsReadingModalOpen(false);
    setSelectedBook(null);
  }, []);

  // Navigate to reading page
  const handleStartReading = useCallback(() => {
    if (selectedBook) {
      router.push(`/reading?bookId=${selectedBook._id}`);
    }
  }, [router, selectedBook]);

  // Deletion processing
  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this book?')) {
      removeBook(id);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Dashboard */}
      <Dashboard>
        {/* Add Book Form */}
        <AddBookForm onSuccess={handleAddSuccess} />

        {/* Recommended Books Preview */}
        <RecommendedPreview />
      </Dashboard>

      {/* Main Content */}
      <div
        className="flex flex-1 flex-col rounded-[30px] bg-[#1f1f1f]"
        style={{ padding: '20px 20px 28px' }}
      >
        {/* Header with Filter */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: '20px' }}
        >
          <h2
            className="font-bold text-[#f9f9f9]"
            style={{ fontSize: '20px' }}
          >
            My library
          </h2>

          <Select
            options={FILTER_OPTIONS}
            value={filter}
            onChange={setFilter}
            className="w-[150px]"
          />
        </div>

        {/* Loading State */}
        {(isLoading || isFetching) && (
          <div className="flex flex-1 items-center justify-center py-10">
            <Loader size="lg" />
          </div>
        )}

        {/* Books Grid */}
        {books && books.length > 0 && !isLoading && (
          <MyLibraryBooks
            books={books}
            onRemove={handleRemove}
            onStartReading={handleBookClick}
            isRemoving={isRemoving}
          />
        )}

        {/* Empty State */}
        {books && books.length === 0 && !isLoading && (
          <div className="flex flex-1 flex-col items-center justify-center py-10">
            {/* Book Icon in Circle */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#262626',
                marginBottom: '20px',
              }}
            >
              <Image
                src="/window.svg"
                alt="Books"
                width={50}
                height={50}
              />
            </div>

            {/* Empty State Text */}
            <p
              className="text-center text-[#f9f9f9]"
              style={{ fontSize: '14px' }}
            >
              {filter === 'all' ? (
                <>
                  To start training, add{' '}
                  <span style={{ color: '#e3b94d' }}>some of your books</span>{' '}
                  or
                  <br />
                  from the recommended ones
                </>
              ) : (
                `No ${filter} books`
              )}
            </p>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <AddBookSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />

      {/* Start Reading Modal */}
      <StartReadingModal
        book={selectedBook}
        isOpen={isReadingModalOpen}
        onClose={handleCloseReadingModal}
        onStartReading={handleStartReading}
      />
    </div>
  );
}
