import { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ISneaker } from "../interfaces/query/sneaker.interface";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { useCurrentPrice } from "../hooks/useCurrentPrice";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Image } from "react-native";
import { ModalSneaker } from "./ModalSneaker";
import { useFavoriteStore } from "../store/favorite/store";

interface ISneakerCardProps {
  sneaker: ISneaker;
}

export const SneakerCard: FC<ISneakerCardProps> = ({ sneaker }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { setParams } = useNavigation();

  const currentPrice = useCurrentPrice();

  const { favoriteItems, addToFavorite } = useFavoriteStore();

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  return (
    <>
      <ModalSneaker
        modalVisible={modalVisible}
        closeBottomSheet={() => setModalVisible(false)}
      />
      <TouchableOpacity
        onPress={() => {
          setParams({ sneaker: sneaker } as any);
          openBottomSheet();
        }}
      >
        <View
          style={{
            marginBottom: 30,
          }}
        >
          {((new Date(sneaker.$createdAt).getTime() -
            new Date().getTime()) as any) < 86400000 && (
            <Text
              style={{
                position: "absolute",
                zIndex: 80,
                color: "white",
                fontWeight: "bold",
                fontSize: 12,
                backgroundColor: "red",
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 5,
              }}
            >
              New!
            </Text>
          )}
          <View style={styles.container_sneaker}>
            <Icon
              solid
              style={{
                color: favoriteItems.some((i) => i.$id === sneaker.$id)
                  ? "red"
                  : "#101010",
                paddingHorizontal: 2,
                paddingVertical: 10,
                width: 40,
                borderRadius: 50,
                textAlign: "center",
                position: "absolute",
                right: 10,
                zIndex: 20,
              }}
              name="heart"
              size={15}
              onPress={() => addToFavorite(sneaker)}
            />
            <Image
              style={{
                width: 100,
                height: 100,
                zIndex: 10,
              }}
              source={{ uri: sneaker.image[0] }}
            />
          </View>
          <Text style={{ ...styles.sneakerName }}>
            {sneaker.name?.length >= 15
              ? `${sneaker.name.slice(0, 15)}...`
              : sneaker.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Icon style={{ color: "#101010" }} solid name="star" size={14} />
            <Text style={{ ...styles.rating }}>{sneaker.rating} | </Text>
            <Text style={{ ...styles.soldCount }}>
              {sneaker.soldCount} продано
            </Text>
          </View>
          <Text style={{ ...styles.sneakerPriceOffer }}>
            {sneaker.offer.discount ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    ...styles.sneakerPrice,
                    fontSize: 12,
                    marginRight: 10,
                    textDecorationLine: "line-through",
                    color: "#ccc",
                    position: "absolute",
                    top: -15,
                  }}
                >
                  {(sneaker.price * currentPrice).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
                </Text>

                <Text style={{ ...styles.sneakerPrice }}>
                  {(
                    +sneaker?.price *
                    currentPrice *
                    (1 - +sneaker?.offer.discount / 100)
                  ).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
                </Text>
              </View>
            ) : (
              <Text style={{ ...styles.sneakerPrice }}>
                {parseFloat(
                  //@ts-ignore
                  (+sneaker.price * currentPrice).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })
                )}
              </Text>
            )}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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

  sneakerPriceOffer: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
  },

  container_sneaker: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },
});
