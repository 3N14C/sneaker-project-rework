import { ScrollView, StyleSheet, Text, TouchableHighlight } from "react-native";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IBrand } from "../../../../../interfaces/query/brand.interface";
import { db } from "../../../../../appwrite/appwrite";
import {
  APPWRITE_DB,
  COLLECTION_BRAND,
  COLLECTION_SNEAKER,
} from "../../../../../appwrite/appwrite.constants";
import { FilterBarSkeleton } from "../../../../../skeleton/FilterBarSkeleton";
import { Query } from "appwrite";
import { ISneaker } from "../../../../../interfaces/query/sneaker.interface";
import { SneakerSkeleton } from "../../../../../skeleton/SneakerSkeleton";
import { SneakerCard } from "../../../../../components/SneakerCard";

export const Navbar = () => {
  const [focus, setFocus] = useState<string>("Все");

  const { data: brand, isLoading: isBrandLoading } = useQuery<IBrand[]>({
    queryKey: ["sneakerBrand"],
    queryFn: async (): Promise<IBrand[] | any> => {
      try {
        return (await db.listDocuments(APPWRITE_DB, COLLECTION_BRAND))
          .documents;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    data: sneaker,
    isLoading: isSneakerLoading,
    isFetching: isSneakerFetching,
    refetch,
  } = useQuery<ISneaker[]>({
    queryKey: ["sneaker"],
    queryFn: async (): Promise<ISneaker[] | any> => {
      try {
        if (focus !== "Все" && focus !== null) {
          return (
            await db.listDocuments(APPWRITE_DB, COLLECTION_SNEAKER, [
              Query.startsWith("name", focus),
            ])
          ).documents;
        } else if (focus === "Все") {
          return (await db.listDocuments(APPWRITE_DB, COLLECTION_SNEAKER))
            .documents;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(sneaker);

  useEffect(() => {
    refetch();
  }, [focus]);

  const onFocus = (name: string) => {
    if (focus === name) {
      setFocus("Все");
    } else {
      setFocus(name);
    }
  };

  if (isBrandLoading) {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FilterBarSkeleton />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.scrollbar}>
          <Text
            onPress={() => setFocus("Все")}
            style={{
              color: focus === "Все" ? "white" : "black",
              backgroundColor: focus === "Все" ? "black" : "white",
              ...styles.scrollbar_item,
              marginRight: 15,
              textAlign: "center",
              alignItems: "center",
            }}
          >
            Все
          </Text>

          {brand?.map((brand, idx) => (
            <TouchableHighlight
              underlayColor={"transparent"}
              key={brand.$id}
              onPress={() => {
                onFocus(brand.name);
              }}
            >
              <View
                style={{
                  ...styles.scrollbar_item,
                  marginLeft: idx !== 0 ? 15 : 0,
                  backgroundColor: focus === brand.name ? "black" : "white",
                }}
              >
                <Text
                  style={{ color: focus === brand.name ? "white" : "black" }}
                >
                  {brand.name}
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>

      <View style={styles.container}>
        {isSneakerLoading ||
          (isSneakerFetching && (
            <>
              <SneakerSkeleton />
            </>
          ))}

        <View style={styles.container_item}>
          {sneaker?.map((sneaker) => (
            <View key={sneaker.$id}>
              <SneakerCard sneaker={sneaker} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },

  scrollbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  },
});
