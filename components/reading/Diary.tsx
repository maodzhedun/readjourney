//components/reading/Diary.tsx

'use client';

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
      <div className="rounded-xl bg-[#262626] p-5">
        <h3 className="mb-2 text-lg font-bold text-[#f9f9f9]">Diary</h3>
        <p className="text-sm text-[#686868]">
          No reading sessions yet. Start reading to see your progress here!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#262626] p-5">
      <h3 className="mb-4 text-lg font-bold text-[#f9f9f9]">Diary</h3>

      <ul className="max-h-[300px] space-y-3 overflow-y-auto pr-2">
        {completedSessions.map(entry => (
          <DiaryEntry
            key={entry._id}
            entry={entry}
            onDelete={() => handleDelete(entry._id)}
            isDeleting={isPending}
          />
        ))}
      </ul>
    </div>
  );
}