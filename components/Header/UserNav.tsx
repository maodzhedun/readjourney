'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navLinks = [
  { href: '/recommended', label: 'Home' },
  { href: '/library', label: 'My library' },
];

interface UserNavProps {
  onLinkClick?: () => void;
  className?: string;
}

export default function UserNav({ onLinkClick, className }: UserNavProps) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={clsx(
                'relative py-2 text-sm transition-colors',
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-[#f9f9f9]'
                  : 'text-[#686868] hover:text-[#f9f9f9]'
              )}
            >
              {link.label}
              {(pathname === link.href ||
                pathname.startsWith(link.href + '/')) && (
                <span className="absolute -bottom-1 left-0 right-0 mx-auto h-1 w-full rounded-full bg-[#4f92f7]" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
