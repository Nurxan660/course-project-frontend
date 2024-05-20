import { useState, useEffect } from 'react';
import { getCollections } from '../api/collection';
import { CollectionCategory } from '../types/CollectionCategory';

export const useCollectionCategories = () => {
  const [categories, setCategories] = useState<CollectionCategory[]>([])

  const loadCollections = async () => {
    try {
      const res = await getCollections();
      setCategories(res.data);
    } catch (e) { console.log(e) }
  };

  useEffect(() => {
    loadCollections();
  }, []);

  return categories;
};