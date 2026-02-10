//components/reading/ProgressCircle.tsx

interface ProgressCircleProps {
  percentage: number;
  pagesRead: number;
  totalPages: number;
}

export default function ProgressCircle({
  percentage,
  pagesRead,
  totalPages,
}: ProgressCircleProps) {
  // SVG parameters
  const size = 150;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="-rotate-90 transform"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#262626"
            strokeWidth={strokeWidth}
          />

          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#30b94d"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[#f9f9f9]">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Pages Info */}
      <p className="mt-4 text-sm text-[#686868]">
        {pagesRead} of {totalPages} pages
      </p>
    </div>
  );
}