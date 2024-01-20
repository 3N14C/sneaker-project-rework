import { FC, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Modal, ScrollView, View } from "react-native";
import { useCurrentPrice } from "../hooks/useCurrentPrice";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ISneaker } from "../interfaces/query/sneaker.interface";
import Icon from "react-native-vector-icons/FontAwesome5";
// import { Carousel } from "react-native-basic-carousel";
import { StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { db } from "../appwrite/appwrite";
import { APPWRITE_DB, COLLECTION_SIZE } from "../appwrite/appwrite.constants";
import { ISize } from "../interfaces/query/size.interface";
import { useCartStore } from "../store/cart-store/store";
import Toast from "react-native-toast-message";
import Carousel from "react-native-reanimated-carousel";

interface IModalSneakerProps {
  modalVisible: boolean;
  closeBottomSheet: () => void;
}

export const ModalSneaker: FC<IModalSneakerProps> = ({
  modalVisible,
  closeBottomSheet,
}) => {
  const [focus, setFocus] = useState<number | null>(null);
  const currentPrice = useCurrentPrice();
  const route =
    useRoute<RouteProp<{ params: { sneaker: ISneaker } }, "params">>();

  const { addCartItem } = useCartStore();
  const { sneaker } = route?.params;
  const { data: modelSize, isLoading } = useQuery<ISize[]>({
    queryKey: ["size"],
    queryFn: async (): Promise<ISize[] | any> => {
      return (await db.listDocuments(APPWRITE_DB, COLLECTION_SIZE)).documents;
    },
  });

  if (isLoading) return <></>;

  const onFocus = (idx: number) => {
    if (focus === idx) {
      setFocus(null);
    } else {
      setFocus(idx);
    }

    if (
      !modelSize![idx]?.sneaker.some(
        (sneaker) => sneaker?.name === sneaker?.name
      )
    ) {
      Toast.show({
        type: "error",
        text1: "Размера нет в наличии!",
        visibilityTime: 2000,
        position: "top",
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Размер товара есть в наличии!",
        visibilityTime: 2000,
        position: "top",
      });
    }
  };

  const validationToAdd = () => {
    if (focus === null) {
      Toast.show({
        type: "error",
        text1: "Выберите размер!",
        visibilityTime: 2000,
        position: "top",
      });
    } else if (
      modelSize![focus!]?.sneaker
        .map((sneaker) => sneaker?.name)
        .includes(sneaker?.name)
    ) {
      addCartItem({
        ...sneaker,
        size: modelSize![focus!].name,
      });
      setFocus(null);
      Toast.show({
        type: "success",
        text1: "Товар добавлен в корзину!",
        visibilityTime: 2000,
        position: "top",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Размера нет в наличии!",
        visibilityTime: 2000,
        position: "top",
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          closeBottomSheet();
          setFocus(null);
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            activeOpacity={1}
          >
            <View style={{ paddingVertical: 0 }}>
              <View style={{ backgroundColor: "#f3f3f3" }}>
                <Icon
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 20,
                    zIndex: 20,
                  }}
                  onPress={closeBottomSheet}
                  name="arrow-left"
                  size={30}
                />
                <View style={{ alignItems: "center" }}>
                  <Carousel
                    loop
                    autoPlay={sneaker.image?.length > 1 ? true : false}
                    width={Dimensions.get("window").width}
                    height={300}
                    data={sneaker.image}
                    pagingEnabled={true}
                    maxScrollDistancePerSwipe={0.5}
                    autoFillData
                    renderItem={({ item }) => (
                      <Image
                        source={{
                          uri: item,
                        }}
                        style={{
                          width: "100%",
                          height: 300,
                          resizeMode: "cover",
                        }}
                      />
                    )}
                  />
                </View>

                <View style={{ ...styles.container }}>
                  <Text style={styles.sneakerTitle}>{sneaker?.name}</Text>

                  <View style={{ ...styles.sneakerParams }}>
                    <Text style={styles.soldCount}>
                      {sneaker?.soldCount} продано
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Icon
                        style={{ color: "#101010" }}
                        solid
                        name="star"
                        size={20}
                      />
                      <Text>{sneaker?.rating}</Text>
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        marginVertical: 20,
                      }}
                    >
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          Описание
                        </Text>
                        <Text style={{ marginTop: 10 }}>
                          {sneaker?.description || "lorem"}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 20,
                        }}
                      >
                        <View>
                          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            Размер
                          </Text>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {modelSize?.map((size, idx) => (
                              <TouchableOpacity
                                key={size.$id}
                                onPress={() => {
                                  onFocus(idx);
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.sneakerSize,
                                    color:
                                      focus === idx &&
                                      size?.sneaker
                                        .map((size) => size.name)
                                        .includes(sneaker?.name)
                                        ? "white"
                                        : "black",
                                    borderColor: size?.sneaker
                                      .map((size) => size.name)
                                      .includes(sneaker?.name)
                                      ? "black"
                                      : "#6f7071",
                                    opacity: size?.sneaker
                                      .map((size) => size.name)
                                      .includes(sneaker?.name)
                                      ? 1
                                      : 0.2,
                                    marginLeft: idx !== 0 ? 10 : 0,
                                    backgroundColor:
                                      focus === idx &&
                                      size?.sneaker
                                        .map((size) => size.name)
                                        .includes(sneaker?.name)
                                        ? "#101010"
                                        : "#fff",
                                  }}
                                >
                                  {size.name}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </View>

                      <View style={{ ...styles.containerItem }}>
                        <View>
                          <Text style={{ ...styles.priceTitle }}>
                            Итоговая цена
                          </Text>

                          {sneaker?.offer?.discount ? (
                            <View
                              style={{
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.sneakerPrice,
                                  fontSize: 14,
                                  marginRight: 10,
                                  textDecorationLine: "line-through",
                                  color: "#ccc",
                                }}
                              >
                                {(
                                  +sneaker?.price * currentPrice
                                ).toLocaleString("ru-RU", {
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
                              {(+sneaker?.price * currentPrice).toLocaleString(
                                "ru-RU",
                                {
                                  style: "currency",
                                  currency: "RUB",
                                }
                              )}
                            </Text>
                          )}
                        </View>

                        <View>
                          <TouchableHighlight
                            underlayColor={"#393939"}
                            style={{
                              ...styles.button,
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.5,
                              shadowRadius: 3,
                              elevation: 5,
                            }}
                            onPress={() => {
                              validationToAdd();
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Icon
                                color={"white"}
                                solid
                                name="shopping-bag"
                                size={20}
                                style={{ marginRight: 15 }}
                              />
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: 15,
                                }}
                              >
                                Добавить
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <Toast />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingBottom: 20,
  },

  containerItem: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sneakerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  soldCount: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  sneakerParams: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  sneakerSize: {
    marginTop: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 5,
  },

  priceTitle: {
    color: "#c1c1c1",
    fontSize: 12,
  },

  button: {
    backgroundColor: "#101010",
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 50,
    textAlign: "center",
  },
});
