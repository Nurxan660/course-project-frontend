import React, { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import PaginationStore from '../store/PaginationStore';
import { ReactNode } from 'react';

const StoreContext = createContext<PaginationStore | null>(null);

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const store = useLocalObservable(() => new PaginationStore());

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const usePaginationStore = () => useContext(StoreContext);