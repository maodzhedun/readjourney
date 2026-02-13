// components/reading/ProgressCircle.tsx
'use client';

import { useEffect, useState } from 'react';

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
  const [size, setSize] = useState(116);
  const [strokeWidth, setStrokeWidth] = useState(8);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1440) {
        setSize(168);
        setStrokeWidth(12);
      } else if (window.innerWidth >= 768) {
        setSize(138);
        setStrokeWidth(10);
      } else {
        setSize(116);
        setStrokeWidth(8);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[116px] w-[116px] md:h-[138px] md:w-[138px] 2xl:h-[168px] 2xl:w-[168px]">
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
          <span className="text-lg font-bold text-[#f9f9f9] md:text-xl 2xl:text-2xl">
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
