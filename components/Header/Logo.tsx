import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

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
      <Image
        src="/images/logo.svg"
        alt="Read Journey"
        width={42}
        height={17}
        className="h-auto w-auto"
      />
      {showText && (
        <span className="text-lg font-bold uppercase tracking-[0.02em] text-[#f9f9f9]">
          Read Journey
        </span>
      )}
    </Link>
  );
}
