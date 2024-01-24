import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { ScrollView, TouchableHighlight, View } from "react-native";
import { IOffer } from "../../interfaces/query/offer.interface";
import { db } from "../../appwrite/appwrite";
import {
  APPWRITE_DB,
  COLLECTION_OFFER,
} from "../../appwrite/appwrite.constants";
import { SpecialOfferItem } from "./_components/SpecialOfferItem";
import { useNavigation } from "@react-navigation/native";
import { OfferSkeleton } from "../../skeleton/OfferSkeleton";

export const SpecialOffers: FC = () => {
  const { data: offer, isLoading } = useQuery<IOffer[]>({
    queryKey: ["specialOffers"],
    queryFn: async (): Promise<IOffer[] | any> => {
      try {
        return (await db.listDocuments(APPWRITE_DB, COLLECTION_OFFER))
          .documents;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { navigate } = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "white", marginBottom: 20 }}
    >
      {/* @ts-ignore */}
      {isLoading && <OfferSkeleton length={offer?.length} />}

      <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
        {offer?.map((offerItem, idx) => (
          <View key={offerItem.$id}>
            <TouchableHighlight
              underlayColor={"transparent"}
              onPress={() =>
                // @ts-ignore
                navigate("SneakerOffer", offerItem)
              }
            >
              <SpecialOfferItem
                offer={offerItem}
                background={
                  idx === 0
                    ? "#ce081e"
                    : idx === 1
                      ? "#7a5548"
                      : idx === 2
                        ? "#607d8a"
                        : "#3f51b2"
                }
              />
            </TouchableHighlight>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
