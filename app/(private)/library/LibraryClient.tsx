//app/(private)/library/LibraryClient.tsx)


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useOwnBooks, useRemoveBook } from '@/hooks/useBooks';
import { useModal } from '@/hooks/useModal';
import { Book } from '@/types';
import { FILTER_OPTIONS } from '@/utils/constants';

import Dashboard from '@/components/Dashboard/Dashboard';
import AddBookForm from '@/components/forms/AddBookForm';
import RecommendedPreview from '@/components/Dashboard/RecommendedPreview';
import MyLibraryBooks from '@/components/books/MyLibraryBooks';
import AddBookSuccessModal from '@/components/modals/AddBookSuccessModal';
import Select from '@/components/ui/Select';
import Loader from '@/components/ui/Loader';

export default function LibraryClient() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  // Successful addition modal
  const successModal = useModal();
  const [addedBook, setAddedBook] = useState<Book | null>(null);

  // Library request
  const { data: books, isLoading, isFetching } = useOwnBooks(filter);

  // Deletion mutation
  const { mutate: removeBook, isPending: isRemoving } = useRemoveBook();

  // Handling successful book addition
  const handleAddSuccess = () => {
    // You can show the modal or just refresh the list.
    // The list will be refreshed automatically via invalidateQueries.
  };

  // Deletion processing
  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this book?')) {
      removeBook(id);
    }
  };

  // Switch to reading0
  const handleStartReading = (book: Book) => {
    router.push(`/reading?bookId=${book._id}`);
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
      <div className="flex flex-1 flex-col rounded-[30px] bg-[#1f1f1f] p-5 md:p-7">
        {/* Header with Filter */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#f9f9f9] md:text-[28px]">
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
        {books && !isLoading && (
          <MyLibraryBooks
            books={books}
            onRemove={handleRemove}
            onStartReading={handleStartReading}
            isRemoving={isRemoving}
          />
        )}

        {/* Empty State */}
        {books && books.length === 0 && !isLoading && (
          <div className="flex flex-1 flex-col items-center justify-center py-10">
            <p className="mb-4 text-6xl">📚</p>
            <p className="mb-2 text-center text-[#f9f9f9]">
              {filter === 'all'
                ? 'Your library is empty'
                : `No ${filter} books`}
            </p>
            <p className="text-center text-sm text-[#686868]">
              {filter === 'all'
                ? 'Add books from the recommended section or create your own!'
                : 'Try selecting a different filter.'}
            </p>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {addedBook && (
        <AddBookSuccessModal
          book={addedBook}
          isOpen={successModal.isOpen}
          onClose={successModal.close}
        />
      )}
    </div>
  );
}