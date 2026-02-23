// components/Header/Header.tsx

'use client';

import { useState } from 'react';

import { useLogout } from '@/hooks/useAuth';
import Logo from './Logo';
import UserNav from './UserNav';
import UserBar from './UserBar';
import BurgerMenu from './BurgerMenu';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  return (
    <header
      className="rounded-[15px] bg-[#1f1f1f]"
      style={{ padding: '16px 20px' }}
    >
      <div className="flex items-center justify-between">
        {/* Logo: icon+text on desktop (1440px+), icon only on tablet+mobile */}
        <Logo showText className="hidden 2xl:flex" />
        <Logo showText={false} className="2xl:hidden" />

        {/* Navigation - visible from tablet (768px+) */}
        <UserNav className="hidden md:flex" />

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Avatar with name on desktop (1440px+) */}
          <UserBar showName className="hidden 2xl:flex" />
          {/* User Avatar without name on tablet */}
          <UserBar className="hidden md:flex 2xl:hidden" />
          {/* User Avatar on mobile */}
          <UserBar className="md:hidden" />

          {/* Logout button: visible from tablet (768px+) */}
          <Button
            onClick={() => logout()}
            isLoading={isPending}
            variant="outline"
            size="sm"
            className="hidden md:flex"
          >
            Log out
          </Button>

          {/* Burger Button: mobile only (hidden on tablet+) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-70 md:hidden"
            aria-label="Open menu"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              className="stroke-white"
              fill="none"
            >
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>
        </div>
      </div>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
