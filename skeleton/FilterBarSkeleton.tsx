import { Skeleton } from "@rneui/base";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

export const FilterBarSkeleton: FC = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Skeleton
          key={idx}
          width={80}
          height={30}
          skeletonStyle={{
            backgroundColor: "#f3f3f3",
            backfaceVisibility: "hidden",
            borderRadius: 10,
          }}
          style={{ backgroundColor: "transparent" }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    width: "100%",
  },
});
