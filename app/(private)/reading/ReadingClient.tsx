//app/(private)/reading/ReadingClient.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useBookById } from '@/hooks/useBooks';
import { useStartReading, useFinishReading } from '@/hooks/useReading';
import { useModal } from '@/hooks/useModal';

import Dashboard from '@/components/Dashboard/Dashboard';
import AddReadingForm from '@/components/forms/AddReadingForm';
import ReadingDetails from '@/components/reading/ReadingDetails';
import BookFinishedModal from '@/components/modals/BookFinishedModal';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';

interface ReadingClientProps {
  bookId?: string;
}

export default function ReadingClient({ bookId }: ReadingClientProps) {
  const finishedModal = useModal();

  // Book request
  const { data: book, isLoading, isError } = useBookById(bookId || '');

  // Reading mutations
  const { mutate: startReading, isPending: isStarting } = useStartReading();
  const { mutate: finishReading, isPending: isFinishing } = useFinishReading();

  // If there is no bookId, display an empty state
  if (!bookId) {
    return (
      // 158px = padding-top(32) + header(74) + margin(20) + padding-bottom(32)
      <div
        className="flex flex-col lg:flex-row"
        style={{ gap: '16px', height: 'calc(100dvh - 158px)' }}
      >
        <Dashboard>
          <p className="text-[#686868]">Select a book to start reading</p>
        </Dashboard>

        <div
          className="flex flex-1 flex-col items-center justify-center rounded-[30px] bg-[#1f1f1f]"
          style={{ padding: '40px' }}
        >
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

  // Has completed (inactive) progress entries
  const completedProgress =
    book.progress?.filter(p => p.status === 'inactive') || [];
  const hasCompletedProgress = completedProgress.length > 0;

  // Processing the completion of the book
  const handleBookFinished = () => {
    finishedModal.open();
  };

  // Handle red button click
  const handleRecordClick = () => {
    if (isReading) {
      // If reading, stop at current page (use last page from active progress)
      const currentPage = activeProgress?.startPage || 0;
      finishReading(
        { id: book._id, page: currentPage },
        {
          onSuccess: () => {
            if (currentPage >= book.totalPages) {
              handleBookFinished();
            }
          },
        }
      );
    } else {
      // Start reading from page 0 or last read page
      startReading({ id: book._id, page: pagesRead });
    }
  };

  // Calculate average reading speed and time left
  const avgSpeed =
    completedProgress.length > 0
      ? completedProgress.reduce((sum, p) => sum + p.speed, 0) /
        completedProgress.length
      : 0;

  const pagesLeft = book.totalPages - pagesRead;
  const minutesLeft = avgSpeed > 0 ? (pagesLeft / avgSpeed) * 60 : 0;
  const hoursLeft = Math.floor(minutesLeft / 60);
  const minsLeft = Math.round(minutesLeft % 60);

  return (
    // height fills exactly the viewport minus layout chrome (header + paddings)
    <div
      className="flex flex-col lg:flex-row"
      style={{ gap: '16px', height: 'calc(100dvh - 158px)' }}
    >
      {/* Dashboard — flex column, fills full height */}
      <Dashboard>
        {/* Reading Form */}
        <AddReadingForm book={book} onFinish={handleBookFinished} />

        {/* Progress Section */}
        {hasCompletedProgress ? (
          <ReadingDetails
            bookId={book._id}
            progress={book.progress || []}
            totalBookPages={book.totalPages}
          />
        ) : (
          <div>
            <h3
              className="font-bold text-[#f9f9f9]"
              style={{
                fontSize: '18px',
                marginBottom: '8px',
                lineHeight: '1.1',
              }}
            >
              Progress
            </h3>
            <p
              className="text-[#686868]"
              style={{
                fontSize: '14px',
                marginBottom: '20px',
                lineHeight: '1.3',
              }}
            >
              Here you will see when and how much you read. To record, click on
              the red button above.
            </p>
            <div className="flex justify-center">
              <img
                src="/images/star@1x.png"
                srcSet="/images/star@1x.png 1x, /images/star@2x.png 2x"
                alt="Star"
                width={100}
                height={100}
              />
            </div>
          </div>
        )}
      </Dashboard>

      {/* Main Content — scrollable on small screens, centered on large */}
      <div
        className="flex flex-1 flex-col items-center overflow-y-auto rounded-[30px] bg-[#1f1f1f]"
        style={{ padding: '40px' }}
      >
        {/* Header with time left */}
        <div className="mb-10 flex w-full items-center justify-between">
          <h2 className="font-bold text-[#f9f9f9]" style={{ fontSize: '28px' }}>
            My reading
          </h2>
          {hasCompletedProgress && pagesLeft > 0 && avgSpeed > 0 && (
            <span className="text-[#686868]" style={{ fontSize: '14px' }}>
              {hoursLeft} hours and {minsLeft} minutes left
            </span>
          )}
        </div>

        {/* Book Cover — 224 × 340 px */}
        <div
          className="relative mb-4 overflow-hidden rounded-lg bg-[#262626]"
          style={{ width: '224px', height: '340px' }}
        >
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            sizes="224px"
            className="object-cover"
          />
        </div>

        {/* Book Info */}
        <h3
          className="mb-1 text-center font-bold text-[#f9f9f9]"
          style={{ fontSize: '20px' }}
        >
          {book.title}
        </h3>
        <p
          className="mb-6 text-center text-[#686868]"
          style={{ fontSize: '14px' }}
        >
          {book.author}
        </p>

        {/* Start/Stop Button */}
        <button
          onClick={handleRecordClick}
          disabled={isStarting || isFinishing}
          className="transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          aria-label={isReading ? 'Stop reading' : 'Start reading'}
        >
          <svg width="50" height="50" viewBox="0 0 32 32">
            <use
              href={
                isReading
                  ? '/sprite.svg#icon-stop_record'
                  : '/sprite.svg#icon-record'
              }
            />
          </svg>
        </button>
      </div>

      {/* Book Finished Modal */}
      <BookFinishedModal
        isOpen={finishedModal.isOpen}
        onClose={finishedModal.close}
      />
    </div>
  );
}
