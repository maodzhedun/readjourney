//components/reading/DiaryEntry.tsx

import { Trash2 } from 'lucide-react';
import { ReadingProgress } from '@/types';

interface DiaryEntryProps {
  entry: ReadingProgress;
  date: string;
  totalPages: number;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function DiaryEntry({
  entry,
  date,
  totalPages,
  onDelete,
  isDeleting,
}: DiaryEntryProps) {
  // Calculate the number of pages read in this session
  const pagesRead = entry.finishPage - entry.startPage;

  // Calculate reading time in minutes
  const startTime = new Date(entry.startReading).getTime();
  const endTime = new Date(entry.finishReading).getTime();
  const readingTimeMinutes = Math.round((endTime - startTime) / (1000 * 60));

  // Calculate percentage (assuming this is percentage of speed or progress)
  // Based on mockup, it seems to show reading efficiency or similar metric
  const percentage = entry.speed ? (entry.speed / 60).toFixed(1) : '0';

  // Format speed
  const pagesPerHour = Math.round(entry.speed || 0);

  // Progress bar width (based on some metric - let's use a portion of max speed)
  const progressWidth = Math.min(100, (pagesPerHour / 100) * 100);

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Date Row */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: '8px' }}
      >
        <div className="flex items-center gap-3">
          {/* Square icon */}
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #1f1f1f',
              borderRadius: '4px',
              backgroundColor: '#262626',
            }}
          />
          {/* Date */}
          <span
            className="text-[#f9f9f9]"
            style={{ fontSize: '14px' }}
          >
            {date}
          </span>
        </div>
        {/* Pages count */}
        <span
          className="text-[#686868]"
          style={{ fontSize: '12px' }}
        >
          {totalPages} pages
        </span>
      </div>

      {/* Stats Row */}
      <div
        className="flex items-center gap-4"
        style={{ marginLeft: '32px' }}
      >
        {/* Percentage and Time */}
        <div>
          <p
            className="font-bold text-[#f9f9f9]"
            style={{ fontSize: '16px', lineHeight: '1.2' }}
          >
            {percentage}%
          </p>
          <p
            className="text-[#686868]"
            style={{ fontSize: '10px' }}
          >
            {readingTimeMinutes} minutes
          </p>
        </div>

        {/* Progress Bar and Speed */}
        <div className="flex flex-1 items-center gap-3">
          {/* Progress Bar */}
          <div
            className="h-1 flex-1 rounded-full bg-[#1f1f1f]"
            style={{ maxWidth: '60px' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressWidth}%`,
                backgroundColor: '#30b94d',
              }}
            />
          </div>

          {/* Speed */}
          <span
            className="text-[#686868]"
            style={{ fontSize: '10px', whiteSpace: 'nowrap' }}
          >
            {pagesPerHour} pages
            <br />
            per hour
          </span>

          {/* Delete Button */}
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="text-[#686868] transition-colors hover:text-[#e90516] disabled:opacity-50"
            aria-label="Delete entry"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
