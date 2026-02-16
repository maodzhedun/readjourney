import { forwardRef, ButtonHTMLAttributes, useState } from 'react';
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
      style,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isActive = isHovered || isFocused;

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '30px',
      fontWeight: 700,
      fontSize: '14px',
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.5 : 1,
      transition: 'all 0.2s',
    };

    const getVariantStyle = (): React.CSSProperties => {
      if (variant === 'primary') {
        // Primary (Registration, To apply):
        // Normal: білий фон, темний текст
        // Hover: прозорий фон, біла обводка, білий текст
        if (isActive) {
          return {
            backgroundColor: 'transparent',
            color: '#f9f9f9',
            border: '1px solid #f9f9f9',
          };
        }
        return {
          backgroundColor: '#f9f9f9',
          color: '#1f1f1f',
          border: '1px solid #f9f9f9',
        };
      }
      
      // Outline (Log out):
      // Normal: прозорий фон, біла обводка, білий текст
      // Hover: білий фон, темний текст
      if (isActive) {
        return {
          backgroundColor: '#f9f9f9',
          color: '#1f1f1f',
          border: '1px solid #f9f9f9',
        };
      }
      
      return {
        backgroundColor: 'transparent',
        color: '#f9f9f9',
        border: '1px solid rgba(249, 249, 249, 0.2)',
      };
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { height: '42px', paddingLeft: '20px', paddingRight: '20px' },
      md: { height: '52px', paddingLeft: '54px', paddingRight: '54px' },
      lg: { height: '52px', paddingLeft: '54px', paddingRight: '54px' },
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={className}
        style={{
          ...baseStyle,
          ...getVariantStyle(),
          ...sizeStyles[size],
          ...style,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {isLoading ? <Loader size="sm" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
