import React from 'react';

export const T1Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#E82328"/>
    <path d="M25 35H75V45H55V75H45V45H25V35Z" fill="white"/>
    <path d="M57 25H43L46 15H54L57 25Z" fill="white"/>
  </svg>
);

export const GenGLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`${className} bg-black flex items-center justify-center rounded-full p-1`}>
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0C13.43 0 0 13.43 0 30C0 46.57 13.43 60 30 60C46.57 60 60 46.57 60 30C60 13.43 46.57 0 30 0ZM30 50C18.95 50 10 41.05 10 30C10 18.95 18.95 10 30 10C35.98 10 41.23 12.63 44.72 16.82L38.18 23.36C36.31 21.49 33.4 20 30 20C24.48 20 20 24.48 20 30H30V50Z" fill="#B8860B"/>
    </svg>
  </div>
);

export const DplusKiaLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`${className} flex items-center justify-center`}>
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0 H80 L60 50 L80 100 H20 L40 50 Z" fill="#00f2a9"/>
      <path d="M90 0 H110 V100 H90 Z" fill="#00f2a9"/>
      <path d="M120 50 L140 0 H160 L140 50 L160 100 H140 L120 50Z" fill="#00f2a9" />
      <path d="M150 40 H180 V60 H150 Z" fill="#00f2a9" />
    </svg>
  </div>
);

export const HLELogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`${className} bg-[#FF6A00] flex items-center justify-center rounded-full p-1`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 20 H40 V40 H60 V20 H80 V80 H60 V60 H40 V80 H20 V20 Z" fill="white" />
      <path d="M40 40 H60 V60 H40 V40 Z" fill="#FF6A00" />
    </svg>
  </div>
);

export const KTLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`${className} bg-black flex items-center justify-center rounded-full`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 30 L40 30 L40 70 L25 70 Z" fill="white"/>
      <path d="M45 30 L75 30 L75 45 L60 45 L60 70 L45 70 Z" fill="white"/>
    </svg>
  </div>
);

export const FOXLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`${className} bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center rounded-full p-1`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20 L50 40 L70 20 L80 30 L60 50 L80 70 L70 80 L50 60 L30 80 L20 70 L40 50 L20 30 Z" fill="white"/>
        </svg>
    </div>
);

export const KDFLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`${className} flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 C 20 10, 20 90, 50 90" stroke="#E21936" strokeWidth="10" fill="none"/>
            <path d="M50 10 C 80 10, 80 90, 50 90" stroke="#E21936" strokeWidth="10" fill="none"/>
            <circle cx="50" cy="50" r="10" fill="#003592"/>
        </svg>
    </div>
);

export const BROLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`${className} bg-green-700 flex items-center justify-center rounded-full p-1`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20 H70 L50 50 Z" fill="white"/>
            <path d="M30 80 H70 L50 50 Z" fill="white"/>
        </svg>
    </div>
);

export const DRXLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`${className} flex items-center justify-center`}>
        <svg viewBox="0 0 24 24" fill="#0075C2" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.55 2.625L3.89 2.641a.375.375 0 00-.361.43l1.832 9.16a.375.375 0 01-.15.39l-2.82 1.905a.375.375 0 00-.14.512l1.01 1.75a.375.375 0 00.48.2l8.834-4.141a.375.375 0 01.428.016l1.378 1.055a.375.375 0 00.46.01l7.15-4.83a.375.375 0 00.14-.512l-1.01-1.75a.375.375 0 00-.48-.2l-2.073 1.085a.375.375 0 01-.42-.036l-3.3-2.626a.375.375 0 00-.45-.021l-1.85 1.05a.375.375 0 01-.469-.074L12.926 2.8a.375.375 0 00-.375-.175z"/>
        </svg>
    </div>
);

export const NSRedForceLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`${className} flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 L50 2 L90 10 L90 50 L50 98 L10 50 Z" fill="#E5001C"/>
            <path d="M50 20 C 40 20, 30 30, 30 40 C 30 60, 50 80, 50 80 C 50 80, 70 60, 70 40 C 70 30, 60 20, 50 20 Z" fill="white"/>
            <circle cx="45" cy="40" r="5" fill="black"/>
            <circle cx="55" cy="40" r="5" fill="black"/>
        </svg>
    </div>
);
