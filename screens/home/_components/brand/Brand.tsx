import { FC } from "react";
import { View } from "react-native";
import { BrandItem } from "./components/BrandItem";

export const Brand:FC = () => {

    return (
      <View style={{ marginTop: 20 }}>
        <BrandItem />
      </View>
    );
}