import React, { useState, useRef } from 'react';
import { Check, ChevronDown, X, LucideIcon } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  label: string;
  icon: LucideIcon;
  options: Option[];
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  error?: string;
  disabled?: boolean;
}

export function MultiSelect({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  error,
  disabled
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const handleToggleOption = (optionValue: string | number) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemoveValue = (optionValue: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const selectedLabels = options
    .filter(option => value.includes(option.value))
    .map(option => option.label);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative">
        <div
          className={`bg-white relative w-full border rounded-md shadow-sm pl-10 pr-3 py-2 cursor-pointer
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'hover:border-indigo-500'}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveValue(value[index], e)}
                    className="ml-1 inline-flex items-center p-0.5 hover:bg-indigo-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-500">请选择</span>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-indigo-50
                  ${value.includes(option.value) ? 'text-indigo-900 bg-indigo-50' : 'text-gray-900'}`}
                onClick={() => handleToggleOption(option.value)}
              >
                <span className="block truncate">{option.label}</span>
                {value.includes(option.value) && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}