import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, showPasswordToggle, type, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-xs text-[#686868]">{label}</label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={clsx(
              'w-full rounded-xl border bg-[#262626] px-3 py-3 text-sm text-[#f9f9f9] outline-none transition-colors placeholder:text-[#686868] md:px-4 md:py-4',
              error
                ? 'border-[#e90516] focus:border-[#e90516]'
                : 'border-[#3e3e3e] focus:border-[#f9f9f9]/40',
              isPassword && showPasswordToggle && 'pr-12',
              className
            )}
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] hover:text-[#f9f9f9]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-[#e90516]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
