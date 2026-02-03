import Link from 'next/link';
import Icon from '@/components/ui/Icon';


interface LogoProps {
  showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps) {
  return (
    <Link href="/recommended" className="flex items-center gap-1">
      <Icon name="logo" size={42} className="text-[#f9f9f9]" />
      {showText && (
        <span className="hidden text-lg font-bold uppercase tracking-wide text-[#f9f9f9] md:block">
          Read Journey
        </span>
      )}
    </Link>
  );
}
