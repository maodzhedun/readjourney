//components/reading/Statistics.tsx

import { ReadingProgress } from '@/types';

interface StatisticsProps {
  progress: ReadingProgress[];
}

export default function Statistics({ progress }: StatisticsProps) {
  // Filter completed sessions
  const completedSessions = progress.filter(p => p.status === 'inactive');

  if (completedSessions.length === 0) {
    return null;
  }

  // Calculating statistics
  const totalPages = completedSessions.reduce(
    (sum, p) => sum + (p.finishPage - p.startPage),
    0
  );

  const avgSpeed =
    completedSessions.reduce((sum, p) => sum + p.speed, 0) /
    completedSessions.length;

  const totalSessions = completedSessions.length;

  // Calculate the total reading time
  const totalMinutes = completedSessions.reduce((sum, p) => {
    const start = new Date(p.startReading).getTime();
    const finish = new Date(p.finishReading).getTime();
    return sum + (finish - start) / (1000 * 60);
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  return (
    <div className="rounded-xl bg-[#262626] p-5">
      <h3 className="mb-4 text-lg font-bold text-[#f9f9f9]">Statistics</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Total Pages */}
        <div className="rounded-lg bg-[#1f1f1f] p-3">
          <p className="text-2xl font-bold text-[#f9f9f9]">{totalPages}</p>
          <p className="text-xs text-[#686868]">Pages read</p>
        </div>

        {/* Sessions */}
        <div className="rounded-lg bg-[#1f1f1f] p-3">
          <p className="text-2xl font-bold text-[#f9f9f9]">{totalSessions}</p>
          <p className="text-xs text-[#686868]">Sessions</p>
        </div>

        {/* Average Speed */}
        <div className="rounded-lg bg-[#1f1f1f] p-3">
          <p className="text-2xl font-bold text-[#4f92f7]">
            {Math.round(avgSpeed)}
          </p>
          <p className="text-xs text-[#686868]">Pages/hour</p>
        </div>

        {/* Total Time */}
        <div className="rounded-lg bg-[#1f1f1f] p-3">
          <p className="text-2xl font-bold text-[#30b94d]">
            {hours}h {minutes}m
          </p>
          <p className="text-xs text-[#686868]">Total time</p>
        </div>
      </div>
    </div>
  );
}