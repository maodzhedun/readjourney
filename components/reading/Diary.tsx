//components/reading/Diary.tsx
'use client';

import { ReadingProgress } from '@/types';
import { useDeleteReading } from '@/hooks/useReading';
import DiaryEntry from './DiaryEntry';

interface DiaryProps {
  bookId: string;
  progress: ReadingProgress[];
  totalBookPages: number;
}

export default function Diary({
  bookId,
  progress,
  totalBookPages,
}: DiaryProps) {
  const { mutate: deleteReading, isPending } = useDeleteReading();

  const completedSessions = [...progress]
    .filter(p => p.status === 'inactive')
    .sort(
      (a, b) =>
        new Date(b.finishReading).getTime() -
        new Date(a.finishReading).getTime()
    );

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
      {/* Header */}
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
          Diary
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#f9f9f9"
          >
            <use href="/sprite.svg#icon-hourglass" />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#f9f9f9"
          >
            <use href="/sprite.svg#icon-pie-chart" />
          </svg>
        </div>
      </div>

      {/* Scrollable list */}
      <div
        style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: 4 }}
      >
        {completedSessions.length === 0 && (
          <p
            style={{
              color: '#686868',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 40,
            }}
          >
            No records yet
          </p>
        )}

        {Object.entries(groupedByDate).map(([date, sessions]) => {
          const dateTotalPages = sessions.reduce(
            (sum, e) => sum + (e.finishPage - e.startPage),
            0
          );
          return (
            <div key={date} style={{ marginBottom: 24 }}>
              {/* Date row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                  style={{ color: '#686868', fontSize: 12, lineHeight: '20px' }}
                >
                  {dateTotalPages} pages
                </span>
              </div>

              {/* Sessions */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  paddingLeft: 28,
                }}
              >
                {sessions.map(session => (
                  <DiaryEntry
                    key={session._id}
                    entry={session}
                    totalBookPages={totalBookPages}
                    onDelete={() =>
                      deleteReading({ bookId, readingId: session._id })
                    }
                    isDeleting={isPending}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
