import { Skeleton } from "@rneui/themed";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import tailwind from "twrnc";

export const BrandSkeleton: FC = () => {
  return (
    <View style={{}}>
      <Skeleton
        skeletonStyle={{
          backgroundColor: "#f3f3f3",
          backfaceVisibility: "hidden",
        }}
        style={tailwind`bg-zinc-200`}
        circle
        animation="pulse"
        width={60}
        height={60}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
