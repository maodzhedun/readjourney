'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
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
    <div ref={selectRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-[#3e3e3e] bg-[#262626] px-4 py-3 text-left text-sm text-[#f9f9f9] transition-colors hover:border-[#f9f9f9]/40 focus:border-[#f9f9f9]/40 focus:outline-none"
      >
        <span className={clsx(!selectedOption && 'text-[#686868]')}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={clsx('transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded-xl border border-[#3e3e3e] bg-[#262626] py-2 shadow-lg">
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  'w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#3e3e3e]',
                  option.value === value ? 'text-[#f9f9f9]' : 'text-[#686868]'
                )}
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
