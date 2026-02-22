'use client';

import { useEffect, useCallback, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  borderRadius?: number;
  background?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = '',
  showCloseButton = true,
  borderRadius = 12,
  background = '#1f1f1f',
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

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

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(20, 20, 20, 0.6)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`relative max-h-[90vh] overflow-y-auto shadow-xl ${className}`}
            style={{
              backgroundColor: background,
              borderRadius: `${borderRadius}px`,
              padding: '40px 50px',
            }}
            onClick={e => e.stopPropagation()}
          >
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute transition-opacity hover:opacity-70"
                style={{
                  right: '16px',
                  top: '16px',
                }}
                aria-label="Close modal"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 32 32"
                  className="stroke-[#f9f9f9]"
                  fill="none"
                >
                  <use href="/sprite.svg#icon-close" />
                </svg>
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
