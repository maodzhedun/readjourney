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
        {/* Logo */}
        <Logo showText className="hidden md:flex" />
        <Logo showText={false} className="md:hidden" />

        {/* Desktop Navigation - centered */}
        <UserNav className="hidden lg:flex" />

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Avatar with name on desktop */}
          <UserBar showName className="hidden lg:flex" />
          <UserBar className="lg:hidden" />

          {/* Desktop Logout */}
          <Button
            onClick={() => logout()}
            isLoading={isPending}
            variant="outline"
            size="sm"
            className="hidden lg:flex"
          >
            Log out
          </Button>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-70 lg:hidden"
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
