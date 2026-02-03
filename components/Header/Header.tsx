// components/Header/Header.tsx

'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

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
    <header className="rounded-[15px] bg-[#1f1f1f] px-5 py-3 md:px-4 md:py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <UserNav className="hidden lg:block" />

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <UserBar showName />

          {/* Desktop Logout */}
          <Button
            onClick={() => logout()}
            isLoading={isPending}
            variant="outline"
            size="sm"
            className="hidden border-[#f9f9f9]/20 lg:flex"
          >
            Log out
          </Button>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-[#f9f9f9] transition-colors hover:text-[#f9f9f9]/70 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
