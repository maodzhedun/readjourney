import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, showPasswordToggle, type, style, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        <div
          className="flex items-center transition-colors"
          style={{
            height: '50px',
            borderRadius: '12px',
            border: error ? '1px solid #e90516' : '1px solid transparent',
            backgroundColor: '#262626',
            padding: '10px',
          }}
        >
          {/* Label inside input */}
          {label && (
            <span
              className="shrink-0"
              style={{ 
                color: '#686868',
                fontSize: '14px',
                marginRight: '8px',
              }}
            >
              {label}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            className="w-full outline-none"
            style={{
              backgroundColor: 'transparent',
              fontSize: '14px',
              color: '#f9f9f9',
              border: 'none',
            }}
            {...props}
          />

          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 shrink-0 transition-colors"
              style={{
                color: '#686868',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs" style={{ color: '#e90516' }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
