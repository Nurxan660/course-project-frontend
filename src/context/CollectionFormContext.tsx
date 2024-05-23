import React, { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { ReactNode } from 'react';
import CollectionFormStore from '../store/CollectionFormStore';

const StoreContext = createContext<CollectionFormStore | null>(null);

interface CollectionStoreProviderProps {
    children: ReactNode;
}

export const CollectionFormStoreProvider = ({ children }: CollectionStoreProviderProps) => {
  const store = useLocalObservable(() => new CollectionFormStore());

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useCollectionFormStore = () => useContext(StoreContext);