
import React from 'react';

interface HeaderProps {
  credits: number;
}

const Header: React.FC<HeaderProps> = ({ credits }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-lg">
            B
          </div>
          <h1 className="text-xl font-bold font-serif text-slate-900 tracking-tight">To Be Read</h1>
        </div>
        
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
          <span className="text-lg" role="img" aria-label="book">📚</span>
          <span className="text-sm font-bold text-indigo-700 uppercase tracking-wide">
            Credits: <span className="text-lg ml-0.5">{credits}</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
