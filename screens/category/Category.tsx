import { RouteProp, useRoute } from "@react-navigation/native";
import { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { IBrand } from "../../interfaces/query/brand.interface";
import { useQuery } from "@tanstack/react-query";
import { db } from "../../appwrite/appwrite";
import {
  APPWRITE_DB,
  COLLECTION_BRAND,
} from "../../appwrite/appwrite.constants";
import { SneakerCard } from "../../components/SneakerCard";
import LoadingScreen from "../../components/LoadingScreen";

export const Category: FC = () => {
  const router = useRoute<RouteProp<{ params: IBrand }, "params">>();
  const brand = router?.params;

  const { data, isLoading } = useQuery<IBrand>({
    queryKey: ["brandId"],
    queryFn: async (): Promise<IBrand | any> => {
      return await db.getDocument(APPWRITE_DB, COLLECTION_BRAND, brand.$id);
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...styles.container }}>
        <View style={{ ...styles.container_item }}>
          {data?.sneaker?.map((item, idx) => (
            <SneakerCard key={item.$id} sneaker={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },

  scrollbar_item: {
    borderColor: "black",
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
  },

  rating: {
    color: "#626164",
    fontSize: 13,
    marginLeft: 5,
  },

  soldCount: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
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
