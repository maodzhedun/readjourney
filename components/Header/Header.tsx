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
        {/* Logo - icon on mobile, full on tablet+ */}
        <Logo showText className="hidden md:flex" />
        <Logo showText={false} className="md:hidden" />

        {/* Desktop Navigation */}
        <UserNav className="hidden lg:flex" />

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* User Avatar - with name on desktop only */}
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
            className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-white/70 lg:hidden"
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
