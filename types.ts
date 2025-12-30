
export interface Book {
  id: string;
  title: string;
  completed: boolean;
  dateAdded: number;
}

export interface WishlistBook {
  id: string;
  title: string;
  purchased: boolean;
  dateAdded: number;
}

export interface AppState {
  tbrBooks: Book[];
  paidBooks: WishlistBook[];
  completedCount: number;
  purchasedCount: number;
}

export enum Tab {
  TBR = 'TBR',
  WISHLIST = 'WISHLIST'
}
