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
      <div className="flex flex-col lg:flex-row" style={{ gap: '20px' }}>
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
    <div className="flex flex-col lg:flex-row" style={{ gap: '20px' }}>
      {/* Dashboard */}
      <Dashboard className="space-y-5">
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
              style={{ fontSize: '18px', marginBottom: '8px' }}
            >
              Progress
            </h3>
            <p
              className="text-[#686868]"
              style={{ fontSize: '14px', marginBottom: '20px' }}
            >
              Here you will see when and how much you read. To record, click on
              the red button above.
            </p>

            {/* Star Icon */}
            <div className="flex justify-center">
              <Image src="/star.svg" alt="Star" width={100} height={100} />
            </div>
          </div>
        )}
      </Dashboard>

      {/* Main Content */}
      <div
        className="flex flex-1 flex-col items-center rounded-[30px] bg-[#1f1f1f]"
        style={{ padding: '40px' }}
      >
        {/* Header with time left */}
        <div className="mb-10 flex w-full items-center justify-between">
          <h2 className="font-bold text-[#f9f9f9]" style={{ fontSize: '28px' }}>
            My reading
          </h2>
          {hasCompletedProgress && pagesLeft > 0 && (
            <span className="text-[#686868]" style={{ fontSize: '14px' }}>
              {hoursLeft} hours and {minsLeft} minutes left
            </span>
          )}
        </div>

        {/* Book Cover */}
        <div
          className="relative mb-4 overflow-hidden rounded-lg bg-[#262626]"
          style={{
            width: '169px',
            height: '256px',
          }}
        >
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            sizes="169px"
            className="object-cover"
          />
        </div>

        {/* Book Info */}
        <h3
          className="mb-1 text-center font-bold text-[#f9f9f9]"
          style={{ fontSize: '18px' }}
        >
          {book.title}
        </h3>
        <p
          className="mb-6 text-center text-[#686868]"
          style={{ fontSize: '12px' }}
        >
          {book.author}
        </p>

        {/* Progress Circle or Red Button */}
        {isReading ? (
          // Active reading - show STOP button
          <button
            onClick={handleRecordClick}
            disabled={isStarting || isFinishing}
            className="flex items-center justify-center rounded-full border-2 border-[#e90516] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'transparent',
            }}
            aria-label="Stop reading"
          >
            {/* Stop icon (square) */}
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#e90516',
                borderRadius: '2px',
              }}
            />
          </button>
        ) : (
          // Not reading - show START button (solid red circle)
          <button
            onClick={handleRecordClick}
            disabled={isStarting || isFinishing}
            className="flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#e90516',
            }}
            aria-label="Start reading"
          />
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
