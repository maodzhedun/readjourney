'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLogout } from '@/hooks/useAuth';
import UserNav from './UserNav';
import Button from '@/components/ui/Button';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BurgerMenu({ isOpen, onClose }: BurgerMenuProps) {
  const { mutate: logout, isPending } = useLogout();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-[200px] flex-col bg-[#262626] p-5 shadow-xl md:w-[250px] lg:hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 text-[#f9f9f9] transition-colors hover:text-[#f9f9f9]/70"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Navigation */}
            <div className="mt-16 flex flex-1 flex-col items-center justify-center">
              <UserNav onLinkClick={onClose} />
            </div>

            {/* Logout Button */}
            <div className="flex justify-center pb-10">
              <Button
                onClick={handleLogout}
                isLoading={isPending}
                variant="outline"
                className="w-full max-w-[120px]"
              >
                Log out
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
