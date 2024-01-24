import { FC } from "react";
import { View } from "react-native";
import { useFavoriteStore } from "../../store/favorite/store";
import { SneakerCard } from "../../components/SneakerCard";
import { StyleSheet } from "react-native";

export const Favorite: FC = () => {
  const { favoriteItems } = useFavoriteStore();


  return (
    <View style={styles.container}>
      <View
        style={{
          width: favoriteItems.length > 1 ? "100%" : 150,
          ...styles.container_item,
        }}
      >
        {favoriteItems.map((sneaker) => (
          <View key={sneaker.$id}>
            <SneakerCard sneaker={sneaker} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },

  container_sneaker: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  container_item: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});
