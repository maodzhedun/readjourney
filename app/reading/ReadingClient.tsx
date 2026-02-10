//app/(private)/reading/ReadingClient.tsx

'use client';

import Link from 'next/link';

import { useBookById } from '@/hooks/useBooks';
import { useModal } from '@/hooks/useModal';

import Dashboard from '@/components/Dashboard/Dashboard';
import AddReadingForm from '@/components/forms/AddReadingForm';
import Diary from '@/components/reading/Diary';
import Statistics from '@/components/reading/Statistics';
import ProgressCircle from '@/components/reading/ProgressCircle';
import BookFinishedModal from '@/components/modals/BookFinishedModal';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import Image from 'next/image';

interface ReadingClientProps {
  bookId?: string;
}

export default function ReadingClient({ bookId }: ReadingClientProps) {
  const finishedModal = useModal();

  // Book request
  const { data: book, isLoading, isError } = useBookById(bookId || '');

  // If there is no bookId, display an empty state
  if (!bookId) {
    return (
      <div className="flex flex-col gap-4 lg:flex-row">
        <Dashboard>
          <p className="text-[#686868]">Select a book to start reading</p>
        </Dashboard>

        <div className="flex flex-1 flex-col items-center justify-center rounded-[30px] bg-[#1f1f1f] p-5 md:p-7">
          <p className="mb-4 text-6xl">📖</p>
          <p className="mb-4 text-center text-[#686868]">
            Choose a book from your library to start reading
          </p>
          <Link href="/library">
            <Button>Go to Library</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // Error
  if (isError || !book) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[30px] bg-[#1f1f1f] p-10">
        <p className="mb-4 text-[#e90516]">Failed to load book.</p>
        <Link href="/library">
          <Button variant="outline">Back to Library</Button>
        </Link>
      </div>
    );
  }

  // Calculating progress
  const pagesRead =
    book.progress?.reduce((total, p) => {
      if (p.status === 'inactive') {
        return total + (p.finishPage - p.startPage);
      }
      return total;
    }, 0) || 0;

  const progressPercent = Math.round((pagesRead / book.totalPages) * 100);

  // Active session check
  const activeProgress = book.progress?.find(p => p.status === 'active');
  const isReading = !!activeProgress;

  // Processing the completion of the book
  const handleBookFinished = () => {
    finishedModal.open();
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Dashboard */}
      <Dashboard>
        {/* Reading Form */}
        <AddReadingForm book={book} onFinish={handleBookFinished} />

        {/* Diary or Statistics */}
        {book.progress && book.progress.length > 0 ? (
          <>
            {/* Toggle can be added if necessary */}
            <Diary bookId={book._id} progress={book.progress} />
            <div className="mt-5">
              <Statistics progress={book.progress} />
            </div>
          </>
        ) : (
          <div className="rounded-xl bg-[#262626] p-5">
            <h3 className="mb-2 text-lg font-bold text-[#f9f9f9]">Progress</h3>
            <p className="text-sm text-[#686868]">
              Here you will see your reading progress and statistics.
            </p>
          </div>
        )}
      </Dashboard>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center rounded-[30px] bg-[#1f1f1f] p-5 md:p-7">
        <h2 className="mb-6 self-start text-xl font-bold text-[#f9f9f9] md:text-[28px]">
          My reading
        </h2>

        <div className="relative mb-4 aspect-[137/208] w-[137px] overflow-hidden rounded-lg bg-[#262626] md:w-[169px]">
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 137px, 169px"
            className="object-cover"
          />
        </div>

        {/* Book Info */}
        <h3 className="mb-1 text-center text-lg font-bold text-[#f9f9f9]">
          {book.title}
        </h3>
        <p className="mb-6 text-center text-sm text-[#686868]">{book.author}</p>

        {/* Progress Circle */}
        <ProgressCircle
          percentage={progressPercent}
          pagesRead={pagesRead}
          totalPages={book.totalPages}
        />

        {/* Reading Status */}
        {isReading && (
          <p className="mt-4 text-sm text-[#4f92f7]">📖 Currently reading...</p>
        )}
      </div>

      {/* Book Finished Modal */}
      <BookFinishedModal
        isOpen={finishedModal.isOpen}
        onClose={finishedModal.close}
      />
    </div>
  );
}
