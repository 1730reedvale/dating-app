import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  checkMutualFavorite,
} from "./FavoritesService";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites when user changes or on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      if (auth.currentUser) {
        setLoading(true);
        try {
          const favs = await getFavorites();
          setFavorites(favs);
        } catch (error) {
          console.error("Failed to load favorites:", error);
        }
        setLoading(false);
      } else {
        setFavorites([]);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [auth.currentUser]);

  const addToFavorites = async (userId) => {
    await addFavorite(userId);
    setFavorites((prev) => [...prev, userId]);
  };

  const removeFromFavorites = async (userId) => {
    await removeFavorite(userId);
    setFavorites((prev) => prev.filter((id) => id !== userId));
  };

  const isFavorite = (userId) => favorites.includes(userId);

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    checkMutualFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
