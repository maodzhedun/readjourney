'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: readonly Option[] | Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={clsx('relative', className)}
      style={{ width: '153px' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 text-left text-[#f9f9f9] transition-colors"
        style={{
          height: '46px',
          backgroundColor: 'transparent',
          border: '1px solid rgba(249, 249, 249, 0.2)',
          borderRadius: '12px',
          padding: '0 14px',
          fontSize: '14px',
        }}
      >
        <span className={clsx(!selectedOption && 'text-[#686868]')}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 32 32"
          className={clsx(
            'stroke-[#f9f9f9] transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
        >
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 top-full z-10 mt-1 w-full overflow-hidden shadow-lg"
          style={{
            backgroundColor: '#262626',
            borderRadius: '12px',
            padding: '14px',
          }}
        >
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className="w-full text-left transition-colors hover:text-[#f9f9f9]"
                style={{
                  fontSize: '14px',
                  color: option.value === value ? '#f9f9f9' : '#686868',
                  padding: '4px 0',
                  background: 'none',
                  border: 'none',
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
