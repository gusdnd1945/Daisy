
import React from 'react';

export const CoinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.093c-1.72.18-3.114 1.636-3.114 3.407 0 1.933 1.566 3.5 3.5 3.5h.093a.75.75 0 000-1.5h-.093a2 2 0 01-2-2c0-1.105.895-2 2-2h.093a.75.75 0 000-1.5h-.093zM12 15.75a.75.75 0 01.75.75v.093c1.72.18 3.114 1.636 3.114 3.407 0 1.933-1.566 3.5-3.5 3.5h-.093a.75.75 0 010-1.5h.093a2 2 0 002-2c0-1.105-.895-2-2-2h-.093a.75.75 0 01-.75-.75v-.093z"
      clipRule="evenodd"
    />
  </svg>
);
