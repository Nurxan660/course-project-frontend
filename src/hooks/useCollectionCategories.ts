import { useState, useEffect } from 'react';
import { getCollectionCategories } from '../api/collection';
import { CollectionCategory } from '../types/collection-types/CollectionCategory';

export const useCollectionCategories = () => {
  const [categories, setCategories] = useState<CollectionCategory[]>([])

  const loadCollections = async () => {
    try {
      const res = await getCollectionCategories();
      setCategories(res.data);
    } catch (e) { console.log(e) }
  };

  useEffect(() => {
    loadCollections();
  }, []);

  return categories;
};