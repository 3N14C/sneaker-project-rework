import { Skeleton } from "@rneui/themed";
import { FC } from "react";
import { View } from "react-native";

export const OfferSkeleton: FC = () => {
    return (
      <View>
        <Skeleton height={120} skeletonStyle={{backgroundColor: "#f3f3f3", backfaceVisibility: "hidden",}} />
      </View>
    );
}