
import React, { useState } from 'react';

interface BookFormProps {
  onAdd: (title: string) => void;
  placeholder: string;
}

const BookForm: React.FC<BookFormProps> = ({ onAdd, placeholder }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-md shadow-indigo-100"
      >
        Add
      </button>
    </form>
  );
};

export default BookForm;
