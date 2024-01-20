import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IOffer } from "../../../../../interfaces/query/offer.interface";
import { db } from "../../../../../appwrite/appwrite";
import {
  APPWRITE_DB,
  COLLECTION_OFFER,
} from "../../../../../appwrite/appwrite.constants";
import { OfferSkeleton } from "../../../../../skeleton/OfferSkeleton";

export const TodayOffer: FC = () => {
  const { navigate } = useNavigation();

  const { data, isLoading } = useQuery<IOffer[]>({
    queryKey: ["todayOffer"],
    queryFn: async (): Promise<IOffer[] | any> => {
      try {
        return (await db.listDocuments(APPWRITE_DB, COLLECTION_OFFER))
          .documents;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const flatArrayOffer = useMemo(
    () =>
      Array.prototype.concat.apply([], data?.map((item) => item) as IOffer[]),
    [data]
  );

  const randomIdxOffer = Math.floor(Math.random() * flatArrayOffer?.length);

  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          shadowOffset: {
            width: 20,
            height: 20,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 20,
        }}
      >
        {data?.map((item, idx) => (
          <View key={item.$id}>
            {idx === randomIdxOffer && (
              <TouchableOpacity
                style={{
                  ...styles.special_offer,
                  backgroundColor:
                    idx === 0
                      ? "#ce081e"
                      : idx === 1
                        ? "#7a5548"
                        : idx === 2
                          ? "#607d8a"
                          : "#3f51b2",
                  shadowColor:
                    idx === 0
                      ? "#ce081e"
                      : idx === 1
                        ? "#7a5548"
                        : idx === 2
                          ? "#607d8a"
                          : "#3f51b2",
                }}
                onPress={() => {
                  //@ts-ignore
                  navigate("OfferList", { data: item });
                }}
              >
                <View style={{ ...styles.special_offer_item }} key={item.id}>
                  <View>
                    <Text
                      style={{
                        ...styles.offer_item_text,
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      {item.discount}%
                    </Text>
                    <Text
                      style={{
                        ...styles.offer_item_text,
                        fontSize: 20,
                        fontWeight: "500",
                        marginTop: 10,
                      }}
                    >
                      {item.day}
                    </Text>
                    <Text
                      style={{
                        ...styles.offer_item_text,
                        fontSize: 10,
                        maxWidth: 125,
                        marginTop: 10,
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>

                  {
                    item.sneaker.map((sneaker, idx) => (
                      <View key={sneaker.$id}>
                        <Image
                          style={{ width: 160, height: 100 }}
                          source={{ uri: sneaker.image[0] }}
                        />
                      </View>
                    ))[0]
                  }
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  special_offer: {
    position: "relative",
    // marginTop: 20,
    borderRadius: 30,
    padding: 20,
  },

  special_offer_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  offer_item_text: {
    color: "white",
    maxWidth: 150,
  },
});
