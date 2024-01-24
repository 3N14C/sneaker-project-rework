import { Skeleton } from "@rneui/themed";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

export const SneakerSkeleton: FC<{ length?: number }> = ({ length }) => {
  return (
    <View style={styles.container_item}>
      {Array.from({ length: length || 10 }).map((_, idx) => (
        <Skeleton
          key={idx}
          height={80}
          width={155}
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
  container_item: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
});
