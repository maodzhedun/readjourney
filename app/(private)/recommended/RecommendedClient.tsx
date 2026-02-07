'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useRecommendedBooks } from '@/hooks/useBooks';
import { useModal } from '@/hooks/useModal';
import { Book } from '@/types';

import Dashboard from '@/components/Dashboard/Dashboard';
import RecommendedInfo from '@/components/Dashboard/RecommendedInfo';
import Quote from '@/components/Dashboard/Quote';
import RecommendedBooks from '@/components/books/RecommendedBooks';
import Pagination from '@/components/books/Pagination';
import BookDetailsModal from '@/components/modals/BookDetailsModal';
import Loader from '@/components/ui/Loader';
import Input from '@/components/ui/Input';

export default function RecommendedClient() {
  // Status of filters and pagination
  const [page, setPage] = useState(1);
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  // Debounce filters - the request is sent 500ms after the set stops
  const [debouncedTitle] = useDebounce(titleFilter, 500);
  const [debouncedAuthor] = useDebounce(authorFilter, 500);

  // Book details modal
  const bookModal = useModal();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Query with debounced filters
  const { data, isLoading, isFetching } = useRecommendedBooks({
    page,
    limit: 10,
    title: debouncedTitle || undefined,
    author: debouncedAuthor || undefined,
  });

  // Refresh the page when changing filters
  const handleTitleChange = (value: string) => {
    setTitleFilter(value);
    setPage(1);
  };

  const handleAuthorChange = (value: string) => {
    setAuthorFilter(value);
    setPage(1);
  };

  // Opening of the modal
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    bookModal.open();
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Dashboard */}
      <Dashboard>
        {/* Filters */}
        <div className="mb-5">
          <h3 className="mb-2 text-sm text-[#f9f9f9]">Filters:</h3>
          <div className="space-y-2">
            <Input
              label="Book title:"
              placeholder="Enter text"
              value={titleFilter}
              onChange={e => handleTitleChange(e.target.value)}
            />
            <Input
              label="The author:"
              placeholder="Enter text"
              value={authorFilter}
              onChange={e => handleAuthorChange(e.target.value)}
            />
          </div>
        </div>

        {/* Info Block */}
        <RecommendedInfo />

        {/* Quote - hidden on mobile */}
        <div className="mt-5 hidden md:block">
          <Quote />
        </div>
      </Dashboard>

      {/* Main Content */}
      <div className="flex flex-1 flex-col rounded-[30px] bg-[#1f1f1f] p-5 md:p-7">
        {/* Header with Pagination */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#f9f9f9] md:text-[28px]">
            Recommended
          </h2>

          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>

        {/* Loading State */}
        {(isLoading || isFetching) && (
          <div className="flex flex-1 items-center justify-center py-10">
            <Loader size="lg" />
          </div>
        )}

        {/* Books Grid */}
        {data && !isLoading && (
          <RecommendedBooks
            books={data.results}
            onBookClick={handleBookClick}
          />
        )}

        {/* Empty State */}
        {data && data.results.length === 0 && !isLoading && (
          <div className="flex flex-1 flex-col items-center justify-center py-10">
            <p className="mb-4 text-6xl">📚</p>
            <p className="text-center text-[#686868]">
              No books found. Try different filters.
            </p>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          isOpen={bookModal.isOpen}
          onClose={bookModal.close}
        />
      )}
    </div>
  );
}
