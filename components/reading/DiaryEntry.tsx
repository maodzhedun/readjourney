//components/reading/DiaryEntry.tsx

import { Trash2 } from 'lucide-react';
import { ReadingProgress } from '@/types';

interface DiaryEntryProps {
  entry: ReadingProgress;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function DiaryEntry({
  entry,
  onDelete,
  isDeleting,
}: DiaryEntryProps) {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Calculate the number of pages read
  const pagesRead = entry.finishPage - entry.startPage;

  // Format speed
  const formatSpeed = (speed: number) => {
    return `${Math.round(speed)} pages/hour`;
  };

  return (
    <li className="flex items-start justify-between rounded-lg bg-[#1f1f1f] p-3">
      <div className="flex-1">
        {/* Date */}
        <p className="mb-1 text-xs text-[#686868]">
          {formatDate(entry.finishReading)}
        </p>

        {/* Pages */}
        <p className="text-sm text-[#f9f9f9]">
          Pages {entry.startPage} - {entry.finishPage}
          <span className="ml-2 text-[#686868]">({pagesRead} pages)</span>
        </p>

        {/* Speed */}
        <p className="text-xs text-[#4f92f7]">{formatSpeed(entry.speed)}</p>
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="ml-2 rounded-full p-1.5 text-[#686868] transition-colors hover:bg-[#262626] hover:text-[#e90516] disabled:opacity-50"
        aria-label="Delete entry"
      >
        <Trash2 size={14} />
      </button>
    </li>
  );
}