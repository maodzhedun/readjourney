//components/reading/ReadingDetails.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ReadingProgress } from '@/types';
import { useDeleteReading } from '@/hooks/useReading';
import DiaryEntry from './DiaryEntry';

interface ReadingDetailsProps {
  bookId: string;
  progress: ReadingProgress[];
  totalBookPages: number;
}

export default function ReadingDetails({
  bookId,
  progress,
  totalBookPages,
}: ReadingDetailsProps) {
  const [view, setView] = useState<'diary' | 'statistics'>('diary');
  const { mutate: deleteReading, isPending } = useDeleteReading();

  // Filter only completed sessions
  const completedSessions = progress
    .filter(p => p.status === 'inactive')
    .sort(
      (a, b) =>
        new Date(b.finishReading).getTime() -
        new Date(a.finishReading).getTime()
    );

  const handleDelete = (readingId: string) => {
    if (confirm('Delete this reading entry?')) {
      deleteReading({ bookId, readingId });
    }
  };

  // Calculate total pages read
  const totalPagesRead = completedSessions.reduce(
    (sum, p) => sum + (p.finishPage - p.startPage),
    0
  );

  // Calculate progress percentage
  const progressPercent = totalBookPages > 0
    ? ((totalPagesRead / totalBookPages) * 100).toFixed(2)
    : '0';

  // Group entries by date for Diary
  const groupedByDate = completedSessions.reduce((acc, entry) => {
    const date = new Date(entry.finishReading).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, ReadingProgress[]>);

  return (
    <div>
      {/* Header with Toggle */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: '14px' }}
      >
        <h3
          className="font-bold text-[#f9f9f9]"
          style={{ fontSize: '18px' }}
        >
          {view === 'diary' ? 'Diary' : 'Statistics'}
        </h3>
        <div className="flex gap-2">
          {/* Hourglass icon - Diary view */}
          <button
            onClick={() => setView('diary')}
            className={`transition-opacity ${view === 'diary' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            aria-label="Show Diary"
          >
            <Image
              src="/hourglass.svg"
              alt="Diary"
              width={20}
              height={20}
            />
          </button>
          {/* Pie chart icon - Statistics view */}
          <button
            onClick={() => setView('statistics')}
            className={`transition-opacity ${view === 'statistics' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            aria-label="Show Statistics"
          >
            <Image
              src="/pie-chart.svg"
              alt="Statistics"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      {/* Diary View */}
      {view === 'diary' && (
        <div
          className="space-y-4 overflow-y-auto pr-1"
          style={{ maxHeight: '350px' }}
        >
          {Object.entries(groupedByDate).map(([date, entries]) => (
            <div key={date}>
              {entries.map((entry) => (
                <DiaryEntry
                  key={entry._id}
                  entry={entry}
                  date={date}
                  totalPages={entries.reduce((sum, e) => sum + (e.finishPage - e.startPage), 0)}
                  onDelete={() => handleDelete(entry._id)}
                  isDeleting={isPending}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Statistics View */}
      {view === 'statistics' && (
        <div>
          {/* Motivational text */}
          <p
            className="text-[#686868]"
            style={{ fontSize: '14px', marginBottom: '20px' }}
          >
            Each page, each chapter is a new round of knowledge, a new step
            towards understanding. By rewriting statistics, we create our own
            reading history.
          </p>

          {/* Progress Circle */}
          <div
            className="mx-auto flex flex-col items-center rounded-xl"
            style={{
              backgroundColor: '#262626',
              padding: '20px',
              maxWidth: '200px',
            }}
          >
            {/* Circle */}
            <div className="relative" style={{ width: '140px', height: '140px' }}>
              <svg
                className="rotate-[-90deg]"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                {/* Background circle */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#1f1f1f"
                  strokeWidth="10"
                />
                {/* Progress circle */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#30b94d"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(parseFloat(progressPercent) / 100) * 377} 377`}
                />
              </svg>
              {/* Percentage text */}
              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <span
                  className="font-bold text-[#f9f9f9]"
                  style={{ fontSize: '20px' }}
                >
                  100%
                </span>
              </div>
            </div>

            {/* Legend */}
            <div
              className="mt-4 flex items-center gap-2"
            >
              <div
                className="rounded-sm"
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#30b94d',
                }}
              />
              <span
                className="font-bold text-[#f9f9f9]"
                style={{ fontSize: '14px' }}
              >
                {progressPercent}%
              </span>
            </div>
            <p
              className="text-[#686868]"
              style={{ fontSize: '12px' }}
            >
              {totalPagesRead} pages read
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
