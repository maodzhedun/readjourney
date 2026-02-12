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
        <div
          className={clsx(
            'flex items-center rounded-xl border bg-[#262626] px-3 py-3 transition-colors md:px-4 md:py-4',
            error
              ? 'border-[#e90516]'
              : 'border-[#3e3e3e] focus-within:border-[#f9f9f9]/40'
          )}
        >
          {/* Label inside input */}
          {label && (
            <span className="mr-2 shrink-0 text-sm text-[#686868]">{label}</span>
          )}

          <input
            ref={ref}
            type={inputType}
            className={clsx(
              'w-full bg-transparent text-sm text-[#f9f9f9] outline-none placeholder:text-[#686868]',
              className
            )}
            {...props}
          />

          {/* Password toggle */}
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 shrink-0 text-[#686868] hover:text-[#f9f9f9]"
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
