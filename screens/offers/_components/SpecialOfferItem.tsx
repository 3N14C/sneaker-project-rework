import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IOffer } from "../../../interfaces/query/offer.interface";

interface IProps {
  offer: IOffer;
  background: string;
}

export const SpecialOfferItem: FC<IProps> = ({ offer, background }) => {
  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          ...styles.special_offer,
          backgroundColor: background,
        }}
      >
        <View style={styles.special_offer_item}>
          <View>
            <Text
              style={{
                ...styles.offer_item_text,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {offer.discount}%
            </Text>
            <Text
              style={{
                ...styles.offer_item_text,
                fontSize: 20,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              {offer.day}
            </Text>
            <Text
              style={{
                ...styles.offer_item_text,
                fontSize: 10,
                maxWidth: 125,
                marginTop: 10,
              }}
            >
              {offer.description}
            </Text>
          </View>
          <View>
            {offer.sneaker.map((sneaker, idx) => (
              <Image
                key={sneaker.$id}
                source={{ uri: sneaker.image[0] }}
                style={{ width: 100, height: 100 }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  special_offer: {
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
