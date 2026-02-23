import { forwardRef, InputHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, showPasswordToggle, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        <div
          className="flex items-center rounded-[12px] bg-[#262626] px-[14px] transition-colors
            h-[44px] md:h-[50px]"
          style={{
            border: error ? '1px solid #e90516' : '1px solid transparent',
          }}
        >
          {label && (
            <span className="shrink-0 text-[14px] text-[#686868] mr-2">
              {label}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            className="w-full bg-transparent text-[14px] text-[#f9f9f9] outline-none border-none"
            {...props}
          />

          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 shrink-0 cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-70"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                className="stroke-[#686868]"
                fill="none"
              >
                <use
                  href={
                    showPassword
                      ? '/sprite.svg#icon-eye-off'
                      : '/sprite.svg#icon-eye'
                  }
                />
              </svg>
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
