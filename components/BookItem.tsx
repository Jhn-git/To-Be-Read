
import React from 'react';

interface BookItemProps {
  title: string;
  completed?: boolean;
  purchased?: boolean;
  onToggle?: () => void;
  onDelete: () => void;
  onBuy?: () => void;
  canAfford?: boolean;
}

const BookItem: React.FC<BookItemProps> = ({ 
  title, 
  completed, 
  purchased, 
  onToggle, 
  onDelete, 
  onBuy, 
  canAfford 
}) => {
  const isWishlist = onBuy !== undefined;
  const isFinished = completed || purchased;

  return (
    <div className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${isFinished ? 'bg-slate-50 border-transparent' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {!isWishlist && (
          <button 
            onClick={onToggle}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 hover:border-indigo-400'}`}
          >
            {completed && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
        
        <span className={`text-sm truncate font-medium transition-all ${isFinished ? 'text-slate-400 line-through italic' : 'text-slate-700'}`}>
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {isWishlist && !purchased && (
          <button
            onClick={onBuy}
            disabled={!canAfford}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${canAfford ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
          >
            {canAfford ? 'Unlock' : 'Locked'}
          </button>
        )}
        
        {purchased && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
            Purchased
          </span>
        )}

        <button 
          onClick={onDelete}
          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookItem;
