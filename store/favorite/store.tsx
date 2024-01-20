import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { ISneaker } from "../../interfaces/query/sneaker.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IFavoriteStore {
  favoriteItems: ISneaker[];
  addToFavorite: (item: ISneaker) => void;
}

export const useFavoriteStore = create<IFavoriteStore>()(
  devtools(
    persist(
      (set) => ({
        favoriteItems: [],
        addToFavorite: (item) =>
          set((state) => {
            const existItem = state.favoriteItems.find(
              (i) => i.$id === item.$id
            );
            if (existItem) {
              return {
                favoriteItems: state.favoriteItems.filter(
                  (i) => i.$id !== item.$id
                ),
              };
            } else {
              return {
                favoriteItems: [...state.favoriteItems, { ...item }],
              };
            }
          }),
      }),
      { name: "favorite-store", storage: createJSONStorage(() => AsyncStorage) }
    )
  )
);
