'use client';

import { useAuth } from '@/hooks/useAuth';

interface UserBarProps {
  showName?: boolean;
}

export default function UserBar({ showName = true }: UserBarProps) {
  const { user } = useAuth();

  const initial = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f9f9f9]/20 bg-[#262626]">
        <span className="text-base font-bold text-[#f9f9f9]">{initial}</span>
      </div>
      {showName && (
        <span className="hidden text-sm text-[#f9f9f9] lg:block">
          {user?.name}
        </span>
      )}
    </div>
  );
}
