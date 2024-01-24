import { RouteProp, useRoute } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ISneaker } from "../../interfaces/query/sneaker.interface";
import { Text } from "react-native";
import { SneakerCard } from "../../components/SneakerCard";
import { IOffer } from "../../interfaces/query/offer.interface";
import { useQuery } from "@tanstack/react-query";
import { db } from "../../appwrite/appwrite";
import {
  APPWRITE_DB,
  COLLECTION_SNEAKER,
} from "../../appwrite/appwrite.constants";
import { Query } from "appwrite";
import { SneakerSkeleton } from "../../skeleton/SneakerSkeleton";

export const SneakerOffer: FC = () => {
  const route = useRoute<RouteProp<{ params: IOffer }, "params">>();

  const offer = route?.params;

  const {
    data: sneaker,
    isLoading,
    isFetching,
  } = useQuery<ISneaker[]>({
    queryKey: ["sneakerFiltered"],
    queryFn: async (): Promise<ISneaker[] | any> => {
      try {
        return (
          await db.listDocuments(APPWRITE_DB, COLLECTION_SNEAKER, [
            Query.equal("discount", offer.discount),
          ])
        ).documents;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading || isFetching) {
    return (
      <View style={styles.container}>
        <SneakerSkeleton length={10} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: sneaker?.length && sneaker?.length > 1 ? "100%" : 150,
          ...styles.container_item,
        }}
      >
        {sneaker?.map((sneaker) => (
          <SneakerCard key={sneaker.$id} sneaker={sneaker} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },

  container_item: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
