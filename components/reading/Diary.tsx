//components/reading/Diary.tsx

'use client';

import Image from 'next/image';
import { ReadingProgress } from '@/types';
import { useDeleteReading } from '@/hooks/useReading';
import DiaryEntry from './DiaryEntry';

interface DiaryProps {
  bookId: string;
  progress: ReadingProgress[];
}

export default function Diary({ bookId, progress }: DiaryProps) {
  const { mutate: deleteReading, isPending } = useDeleteReading();

  // Filter only completed sessions and sort by date (newer at the top)
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

  if (completedSessions.length === 0) {
    return (
      <div>
        <h3
          className="font-bold text-[#f9f9f9]"
          style={{ fontSize: '18px', marginBottom: '8px' }}
        >
          Diary
        </h3>
        <p className="text-sm text-[#686868]">
          No reading sessions yet. Start reading to see your progress here!
        </p>
      </div>
    );
  }

  // Group entries by date
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
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: '14px' }}
      >
        <h3
          className="font-bold text-[#f9f9f9]"
          style={{ fontSize: '18px' }}
        >
          Diary
        </h3>
        <div className="flex gap-2">
          {/* Hourglass icon */}
          <Image
            src="/hourglass.svg"
            alt="Time"
            width={20}
            height={20}
          />
          {/* Pie chart icon */}
          <Image
            src="/pie-chart.svg"
            alt="Statistics"
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* Entries grouped by date */}
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
    </div>
  );
}
