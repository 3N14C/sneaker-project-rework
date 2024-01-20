import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISneaker } from "../../interfaces/query/sneaker.interface";

interface ICartStore {
  cartItems: ISneaker[];
  // addCartItem: (item: ICart, count: number, size: string) => void
  addCartItem: (item: ISneaker) => void;
  removeCartItem: (item: ISneaker) => void;
}

export const useCartStore = create<ICartStore>()(
  devtools(
    persist(
      (set) => ({
        cartItems: [],
        addCartItem: (item) =>
          set((state) => ({
            cartItems: [...state.cartItems, { ...item }],
          })),

        removeCartItem: (item) =>
          set((state) => ({
            cartItems: state.cartItems.filter((i) => i !== item),
          })),
      }),
      { name: "cartStore", storage: createJSONStorage(() => AsyncStorage) }
    )
  )
);
