// src/context/FavoritesContext.tsx
import React, { createContext, useState } from 'react';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (username: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (username: string) => {
    setFavorites((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
