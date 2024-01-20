import { Skeleton } from "@rneui/themed";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import tailwind from "twrnc";

export const BrandSkeleton: FC = () => {
  return (
    <View style={{}}>
      {/* <ContentLoader
        speed={1}
        width={60}
        height={90}
        // viewBox="0 0 100 130"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Circle cx="35" cy="50" r="20" />
        <Rect x="15" y="80" rx="4" ry="4" width="40" height="10" />
      </ContentLoader> */}

      <Skeleton skeletonStyle={{backgroundColor: "#f3f3f3", backfaceVisibility: "hidden"}} style={tailwind`bg-zinc-200`} circle animation="pulse" width={60} height={60} />
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
