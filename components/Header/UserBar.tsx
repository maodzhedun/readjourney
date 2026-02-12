// components/Header/UserBar.tsx

'use client';

import clsx from 'clsx';
import { useAuth } from '@/hooks/useAuth';

interface UserBarProps {
  showName?: boolean;
  className?: string;
}

export default function UserBar({ showName = false, className }: UserBarProps) {
  const { user } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* Avatar */}
      <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full border border-white/20 bg-[#262626] md:h-10 md:w-10">
        <span className="text-sm font-bold text-white">{initial}</span>
      </div>

      {/* Name */}
      {showName && user?.name && (
        <span className="text-sm font-bold text-white">{user.name}</span>
      )}
    </div>
  );
}
