//components/Dashboard/Dashboard.tsx

import { ReactNode } from 'react';
import clsx from 'clsx';

interface DashboardProps {
  children: ReactNode;
  className?: string;
}

export default function Dashboard({ children, className }: DashboardProps) {
  return (
    <aside
      className={clsx(
        'flex w-full flex-col overflow-hidden rounded-[30px] bg-[#1f1f1f] p-5 2xl:w-[353px] 2xl:shrink-0',
        className
      )}
    >
      {children}
    </aside>
  );
}
