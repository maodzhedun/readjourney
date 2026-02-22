//components/reading/ReadingDetails.tsx
'use client';

import { useState } from 'react';
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

  const totalPagesRead = completedSessions.reduce(
    (sum, p) => sum + (p.finishPage - p.startPage),
    0
  );
  const progressPercent =
    totalBookPages > 0
      ? ((totalPagesRead / totalBookPages) * 100).toFixed(2)
      : '0.00';

  // Group sessions by date
  const groupedByDate = completedSessions.reduce(
    (acc, entry) => {
      const date = new Date(entry.finishReading).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    },
    {} as Record<string, ReadingProgress[]>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        <h3
          style={{ color: '#f9f9f9', fontWeight: 700, fontSize: 18, margin: 0 }}
        >
          {view === 'diary' ? 'Diary' : 'Statistics'}
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setView('diary')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              opacity: view === 'diary' ? 1 : 0.4,
            }}
            aria-label="Show Diary"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              stroke="#f9f9f9"
            >
              <use href="/sprite.svg#icon-hourglass" />
            </svg>
          </button>
          <button
            onClick={() => setView('statistics')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              opacity: view === 'statistics' ? 1 : 0.4,
            }}
            aria-label="Show Statistics"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              stroke="#f9f9f9"
            >
              <use href="/sprite.svg#icon-pie-chart" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Diary view ── */}
      {view === 'diary' && (
        <div
          style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: 4 }}
        >
          {Object.entries(groupedByDate).map(([date, entries]) => {
            const dateTotalPages = entries.reduce(
              (sum, e) => sum + (e.finishPage - e.startPage),
              0
            );
            return (
              <div key={date} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{ flexShrink: 0 }}
                    >
                      <rect
                        x="1.5"
                        y="1.5"
                        width="17"
                        height="17"
                        rx="3"
                        stroke="#f9f9f9"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span
                      style={{
                        color: '#f9f9f9',
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: '20px',
                      }}
                    >
                      {date}
                    </span>
                  </div>
                  <span
                    style={{
                      color: '#686868',
                      fontSize: 12,
                      lineHeight: '20px',
                    }}
                  >
                    {dateTotalPages} pages
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    paddingLeft: 28,
                  }}
                >
                  {entries.map(entry => (
                    <DiaryEntry
                      key={entry._id}
                      entry={entry}
                      totalBookPages={totalBookPages}
                      onDelete={() => handleDelete(entry._id)}
                      isDeleting={isPending}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Statistics view ── */}
      {view === 'statistics' && (
        <div
          style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: 4 }}
        >
          <p
            style={{
              color: '#686868',
              fontSize: 14,
              lineHeight: '1.57',
              marginBottom: 20,
            }}
          >
            Each page, each chapter is a new round of knowledge, a new step
            towards understanding. By rewriting statistics, we create our own
            reading history.
          </p>
          <div
            style={{
              backgroundColor: '#141414',
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', width: 189, height: 189 }}>
              <svg
                style={{ transform: 'rotate(-90deg)' }}
                width="189"
                height="189"
                viewBox="0 0 189 189"
              >
                <circle
                  cx="94.5"
                  cy="94.5"
                  r="80"
                  fill="none"
                  stroke="#262626"
                  strokeWidth="12"
                />
                <circle
                  cx="94.5"
                  cy="94.5"
                  r="80"
                  fill="none"
                  stroke="#30b94d"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(parseFloat(progressPercent) / 100) * 502.65} 502.65`}
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{ color: '#f9f9f9', fontWeight: 700, fontSize: 20 }}
                >
                  {progressPercent}%
                </span>
              </div>
            </div>
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#30b94d',
                  flexShrink: 0,
                }}
              />
              <span style={{ color: '#f9f9f9', fontSize: 14 }}>
                {totalPagesRead} pages read
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
