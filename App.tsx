
import React, { useState, useEffect, useMemo } from 'react';
import { Book, WishlistBook, AppState, Tab } from './types';
import Header from './components/Header';
import ProgressSection from './components/ProgressSection';
import BookForm from './components/BookForm';
import BookItem from './components/BookItem';

const LOCAL_STORAGE_KEY = 'tbr-tracker-state';

const App: React.FC = () => {
  // --- State Initialization ---
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    return {
      tbrBooks: [],
      paidBooks: [],
      completedCount: 0,
      purchasedCount: 0,
    };
  });

  const [activeTab, setActiveTab] = useState<Tab>(Tab.TBR);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // --- Derived State ---
  const availableCredits = useMemo(() => {
    return Math.floor(state.completedCount / 20) - state.purchasedCount;
  }, [state.completedCount, state.purchasedCount]);

  const progressTowardsNext = useMemo(() => {
    return state.completedCount % 20;
  }, [state.completedCount]);

  // --- Actions ---
  const addTbrBook = (title: string) => {
    const newBook: Book = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      dateAdded: Date.now(),
    };
    setState(prev => ({
      ...prev,
      tbrBooks: [newBook, ...prev.tbrBooks],
    }));
  };

  const addWishlistBook = (title: string) => {
    const newBook: WishlistBook = {
      id: crypto.randomUUID(),
      title,
      purchased: false,
      dateAdded: Date.now(),
    };
    setState(prev => ({
      ...prev,
      paidBooks: [newBook, ...prev.paidBooks],
    }));
  };

  const toggleTbrBook = (id: string) => {
    setState(prev => {
      const book = prev.tbrBooks.find(b => b.id === id);
      if (!book) return prev;

      const becomingCompleted = !book.completed;
      
      return {
        ...prev,
        tbrBooks: prev.tbrBooks.map(b => 
          b.id === id ? { ...b, completed: becomingCompleted } : b
        ),
        completedCount: becomingCompleted 
          ? prev.completedCount + 1 
          : Math.max(0, prev.completedCount - 1),
      };
    });
  };

  const deleteTbrBook = (id: string) => {
    setState(prev => {
      const book = prev.tbrBooks.find(b => b.id === id);
      // Optional logic: if you delete a completed book, do you lose progress?
      // Based on the prompt "running total", we keep the completedCount.
      return {
        ...prev,
        tbrBooks: prev.tbrBooks.filter(b => b.id !== id),
      };
    });
  };

  const buyWishlistBook = (id: string) => {
    if (availableCredits < 1) return;

    setState(prev => ({
      ...prev,
      paidBooks: prev.paidBooks.map(b => 
        b.id === id ? { ...b, purchased: true } : b
      ),
      purchasedCount: prev.purchasedCount + 1,
    }));
  };

  const deleteWishlistBook = (id: string) => {
    setState(prev => ({
      ...prev,
      paidBooks: prev.paidBooks.filter(b => b.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Header credits={availableCredits} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        <ProgressSection 
          completedCount={state.completedCount} 
          progress={progressTowardsNext} 
        />

        {/* Tab Switcher */}
        <div className="flex bg-slate-200 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab(Tab.TBR)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === Tab.TBR ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            TBR List ({state.tbrBooks.filter(b => !b.completed).length})
          </button>
          <button 
            onClick={() => setActiveTab(Tab.WISHLIST)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === Tab.WISHLIST ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Wishlist ({state.paidBooks.filter(b => !b.purchased).length})
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[400px]">
          {activeTab === Tab.TBR ? (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold font-serif text-slate-800">To Be Read</h2>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                  Read 20 to earn 1 credit
                </span>
              </div>
              
              <BookForm onAdd={addTbrBook} placeholder="Add a book you want to read..." />

              <div className="space-y-3">
                {state.tbrBooks.length === 0 ? (
                  <EmptyState message="Your TBR list is empty. Add a book to get started!" />
                ) : (
                  [
                    ...state.tbrBooks.filter(b => !b.completed),
                    ...state.tbrBooks.filter(b => b.completed)
                  ].map(book => (
                    <BookItem 
                      key={book.id} 
                      title={book.title}
                      completed={book.completed}
                      onToggle={() => toggleTbrBook(book.id)}
                      onDelete={() => deleteTbrBook(book.id)}
                    />
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold font-serif text-slate-800">Wishlist</h2>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                  Spend 1 credit to buy
                </span>
              </div>

              <BookForm onAdd={addWishlistBook} placeholder="Add a book you want to buy..." />

              <div className="space-y-3">
                {state.paidBooks.length === 0 ? (
                  <EmptyState message="Your wishlist is empty. Add something you're eyeing!" />
                ) : (
                  [
                    ...state.paidBooks.filter(b => !b.purchased),
                    ...state.paidBooks.filter(b => b.purchased)
                  ].map(book => (
                    <BookItem 
                      key={book.id} 
                      title={book.title}
                      purchased={book.purchased}
                      onBuy={() => buyWishlistBook(book.id)}
                      onDelete={() => deleteWishlistBook(book.id)}
                      canAfford={availableCredits > 0}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
    <div className="text-4xl mb-3">📚</div>
    <p className="max-w-[200px] text-sm italic">{message}</p>
  </div>
);

export default App;
