
import React from 'react';

export const LoLIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={className}
    fill="currentColor"
  >
    <path d="M0 0v128h128V0H0zm96 112H32V16h64v96z" />
    <path d="M74.8 61.2V44H53.2v17.2L36 78.4V96h17.2V78.8L70.4 62l-7.2-7.2.4 6.4zm-12.4 9.2l-9.2 9.2V96h12.8V80.4l9.2-9.2H53.2v-6.4h19.2l-9.2-9.2zM92 96H74.8V78.8L92 61.6V96zM92 44H74.8v14.8L86 68l6-6V44z" />
  </svg>
);
