import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IBrand } from "../../../../../interfaces/query/brand.interface";
import { db } from "../../../../../appwrite/appwrite";
import {
  APPWRITE_DB,
  COLLECTION_BRAND,
} from "../../../../../appwrite/appwrite.constants";
import { useNavigation } from "@react-navigation/native";
import { BrandSkeleton } from "../../../../../skeleton/BrandSkeleton";
import tailwind from "twrnc";

export const BrandItem: FC = () => {
  const { navigate } = useNavigation();

  const { data, isLoading } = useQuery<IBrand[]>({
    queryKey: ["brand"],
    queryFn: async (): Promise<IBrand[] | any> => {
      try {
        return (await db.listDocuments(APPWRITE_DB, COLLECTION_BRAND))
          .documents;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={{ flex: 1, ...styles.brand_container, gap: 30 }}>
      {isLoading ? (
        <View style={{ flex: 1, ...styles.brand_container, gap: 30 }}>
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
          <BrandSkeleton />
        </View>
      ) : (
        <View style={{ flex: 1, ...styles.brand_container, gap: 30 }}>
          {data?.map((brand, idx) => (
            <View key={brand.$id}>
              <TouchableOpacity
                onPress={() => {
                  //@ts-ignore
                  navigate("Category", brand);
                }}
              >
                <View>
                  <View style={styles.logo}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{ uri: brand.image }}
                    />
                  </View>
                  <Text style={tailwind`text-center capitalize`}>
                    {brand.name.length > 6
                      ? `${brand.name.slice(0, 6)}...`
                      : brand.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    borderRadius: 50,
    backgroundColor: "#ececec",
    padding: 10,
    alignItems: "center",
  },

  brand_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
