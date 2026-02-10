//components/modals/ConfirmModal.tsx

'use client';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'default';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  variant = 'default',
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[350px]">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4 text-4xl">
          {variant === 'danger' ? '⚠️' : '❓'}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-[#f9f9f9]">{title}</h3>

        {/* Message */}
        <p className="mb-6 text-sm text-[#686868]">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            isLoading={isLoading}
            className={
              variant === 'danger'
                ? 'bg-[#e90516] text-white hover:bg-[#e90516]/80'
                : ''
            }
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}