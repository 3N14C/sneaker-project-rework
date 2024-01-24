import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IAddress } from "../../interfaces/store/address.interface";

interface IAddressStore {
  addAddress: (address: IAddress) => void;
  addressItems: IAddress;
}

export const useAddressStore = create<IAddressStore>()(
  devtools(
    persist(
      (set) => ({
        addressItems: {
          city: "",
          street: "",
          zipCode: "",
        },
        addAddress: (address) =>
          set((state) => ({ ...state, addressItems: address })),
      }),
      { name: "address-store", storage: createJSONStorage(() => AsyncStorage) }
    )
  )
);
