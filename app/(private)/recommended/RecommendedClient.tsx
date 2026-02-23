'use client';

import { useState } from 'react';

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
import Button from '@/components/ui/Button';

export default function RecommendedClient() {
  // Status of filters and pagination
  const [page, setPage] = useState(1);
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  // Applied filters (only change on button click)
  const [appliedTitle, setAppliedTitle] = useState('');
  const [appliedAuthor, setAppliedAuthor] = useState('');

  // Book details modal
  const bookModal = useModal();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Query with applied filters
  const { data, isLoading, isFetching } = useRecommendedBooks({
    page,
    limit: 10,
    title: appliedTitle || undefined,
    author: appliedAuthor || undefined,
  });

  // Apply filters on button click
  const handleApplyFilters = () => {
    setAppliedTitle(titleFilter);
    setAppliedAuthor(authorFilter);
    setPage(1);
  };

  // Opening of the modal
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    bookModal.open();
  };

  return (
    <div className="flex flex-col 2xl:flex-row" style={{ gap: '16px' }}>
      {/* Dashboard */}
      <Dashboard>
        {/* Filters */}
        <div style={{ marginBottom: '20px' }}>
          <p
            className="text-[#f9f9f9]"
            style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}
          >
            Filters:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Input
              label="Book title:"
              placeholder="Enter text"
              value={titleFilter}
              onChange={e => setTitleFilter(e.target.value)}
            />
            <Input
              label="The author:"
              placeholder="Enter text"
              value={authorFilter}
              onChange={e => setAuthorFilter(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button size="sm" onClick={handleApplyFilters}>
              To apply
            </Button>
          </div>
        </div>

        {/* Info Block */}
        <div style={{ marginBottom: '20px' }}>
          <RecommendedInfo />
        </div>

        {/* Quote - hidden on mobile */}
        <div className="hidden md:block">
          <Quote />
        </div>
      </Dashboard>

      {/* Main Content */}
      <div
        className="flex flex-1 flex-col rounded-[30px] bg-[#1f1f1f] p-5 md:p-8 2xl:px-10"
      >
        {/* Header with Pagination */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: '28px' }}
        >
          <h2 className="font-bold text-[#f9f9f9]" style={{ fontSize: '28px' }}>
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
