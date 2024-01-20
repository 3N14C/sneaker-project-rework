import React, { FC } from "react";
import { View, TouchableHighlight } from "react-native";
import { TodayOffer } from "./components/TodayOffer";

export const Offer:FC = () => {
    return (
      <View>
        <TouchableHighlight>
          <TodayOffer />
        </TouchableHighlight>
      </View>
    );
}