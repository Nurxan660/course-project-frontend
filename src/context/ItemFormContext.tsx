import { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { ReactNode } from 'react';
import ItemFormStore from '../store/ItemFormStore';

const StoreContext = createContext<ItemFormStore | null>(null);

interface ItemStoreProviderProps {
    children: ReactNode;
}

export const ItemFormStoreProvider = ({ children }: ItemStoreProviderProps) => {
  const store = useLocalObservable(() => new ItemFormStore());

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useItemFormStore = () => useContext(StoreContext);