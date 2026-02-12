import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/ui/Icon';

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export default function Logo({ showText = true, className }: LogoProps) {
  return (
    <Link
      href="/recommended"
      className={clsx('flex items-center gap-1', className)}
    >
      <Icon name="logo" size={42} className="text-[#f9f9f9]" />
      {showText && (
        <span className="text-lg font-bold uppercase tracking-[0.02em] text-[#f9f9f9]">
          Read Journey
        </span>
      )}
    </Link>
  );
}
