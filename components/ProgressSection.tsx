
import React from 'react';

interface ProgressSectionProps {
  completedCount: number;
  progress: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ completedCount, progress }) => {
  const percentage = (progress / 20) * 100;

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Global Progress</h3>
          <p className="text-2xl font-bold font-serif text-slate-900">
            {completedCount} <span className="text-lg font-normal text-slate-400">books read</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-indigo-600 font-bold text-lg">{progress}</span>
          <span className="text-slate-400 font-medium"> / 20</span>
        </div>
      </div>

      <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-700 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="mt-3 text-xs text-slate-500 text-center font-medium">
        {20 - progress} more books until your next reward credit!
      </p>
    </section>
  );
};

export default ProgressSection;
