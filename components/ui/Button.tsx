import { forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import Loader from './Loader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center rounded-[30px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f9f9f9]/50 disabled:cursor-not-allowed disabled:opacity-50',
          {
            'bg-[#f9f9f9] text-[#1f1f1f] hover:bg-[#f9f9f9]/80':
              variant === 'primary',
            'border border-[#f9f9f9]/20 bg-transparent text-[#f9f9f9] hover:bg-[#f9f9f9]/10':
              variant === 'outline',
          },
          {
            'px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm': size === 'sm',
            'px-5 py-2.5 text-sm md:px-7 md:py-3 md:text-base': size === 'md',
            'px-7 py-3 text-base md:px-9 md:py-4 md:text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading ? <Loader size="sm" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
