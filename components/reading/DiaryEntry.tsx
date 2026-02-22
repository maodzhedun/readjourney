//components/reading/DiaryEntry.tsx
'use client';

import { ReadingProgress } from '@/types';
import { useDeleteReading } from '@/hooks/useReading';

interface DiaryEntryProps {
  entry: ReadingProgress;
  totalBookPages: number;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function DiaryEntry({
  entry,
  totalBookPages,
  onDelete,
  isDeleting,
}: DiaryEntryProps) {
  const pagesRead = entry.finishPage - entry.startPage;
  const diffMs =
    new Date(entry.finishReading).getTime() -
    new Date(entry.startReading).getTime();
  const minutes = Math.max(0, Math.round(diffMs / 60000));

  const pct =
    totalBookPages > 0
      ? ((pagesRead / totalBookPages) * 100).toFixed(2)
      : '0.00';
  const timeLabel = minutes < 1 ? '< 1 min' : `${minutes} minutes`;

  // Use server-provided speed when available; show '—' for 0-minute sessions
  const speed = entry.speed ?? 0;
  const speedLabel = speed > 0 ? String(Math.round(speed)) : '—';

  return (
    <div
      className="grid items-start gap-x-2"
      style={{ gridTemplateColumns: '1fr 59px 14px' }}
    >
      {/* Col 1: percentage + time */}
      <div className="flex flex-col gap-1">
        <span
          style={{
            color: '#f9f9f9',
            fontWeight: 700,
            fontSize: 16,
            lineHeight: '1.25',
          }}
        >
          {pct}%
        </span>
        <span style={{ color: '#686868', fontSize: 10, lineHeight: '1.4' }}>
          {timeLabel}
        </span>
      </div>

      {/* Col 2: diagram (bar line + gradient fill) + speed text */}
      <div className="flex flex-col items-start" style={{ gap: 4 }}>
        <div
          style={{ position: 'relative', width: 59, height: 24, flexShrink: 0 }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#30b94d',
              clipPath: 'polygon(0% 45%, 100% 0%, 100% 10%, 0% 55%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(48,185,77,0.35) 0%, rgba(48,185,77,0) 100%)',
              clipPath: 'polygon(0% 55%, 100% 10%, 100% 100%, 0% 100%)',
            }}
          />
        </div>

        <span
          style={{
            color: '#686868',
            fontSize: 10,
            lineHeight: '1.4',
            width: 59,
          }}
        >
          {speedLabel} pages
          <br />
          per hour
        </span>
      </div>

      {/* Col 3: trash */}
      <button
        onClick={onDelete}
        disabled={isDeleting}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: isDeleting ? 'not-allowed' : 'pointer',
          opacity: isDeleting ? 0.4 : 1,
          lineHeight: 0,
          marginTop: 2,
        }}
        aria-label="Delete entry"
      >
        <svg
          width={14}
          height={14}
          viewBox="0 0 32 32"
          fill="none"
          stroke="#686868"
        >
          <use href="/sprite.svg#icon-trash" />
        </svg>
      </button>
    </div>
  );
}
