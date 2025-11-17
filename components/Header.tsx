import React from 'react';
import { CoinIcon } from './icons/CoinIcon';

interface HeaderProps {
  balance: number;
}

export const Header: React.FC<HeaderProps> = ({ balance }) => {
  return (
    <header className="bg-[#1c1c1f]/80 backdrop-blur-sm p-4 sticky top-0 z-20 border-b border-gray-700/50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          OracleLOL
        </h1>
        <div className="flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-full text-yellow-400 font-semibold shadow-lg border border-yellow-400/20">
          <CoinIcon className="w-6 h-6" />
          <span className="text-lg">{balance.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
};