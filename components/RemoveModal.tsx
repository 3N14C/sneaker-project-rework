import { RouteProp, useRoute } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ISneaker } from "../interfaces/query/sneaker.interface";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import {
  ModalContent,
  Modal,
  BottomModal,
  SlideAnimation,
} from "react-native-modals";
import { Image } from "react-native";
import { useCurrentPrice } from "../hooks/useCurrentPrice";
import { TouchableHighlight } from "react-native";
import { useCartStore } from "../store/cart-store/store";
import Toast from "react-native-toast-message";

interface IProps {
  modalVisible: boolean;
  closeBottomSheet: () => void;
}

export const RemoveModal: FC<IProps> = ({ modalVisible, closeBottomSheet }) => {
  const route =
    useRoute<RouteProp<{ params: { sneaker: ISneaker } }, "params">>();

  const sneaker = route?.params?.sneaker;

  const currentPrice = useCurrentPrice();

  const { removeCartItem } = useCartStore();

  return (
    <View>
      <BottomModal
        onSwipeOut={() => closeBottomSheet()}
        swipeThreshold={100}
        visible={modalVisible}
        modalStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        <ModalContent>
          <TouchableOpacity activeOpacity={1}>
            <View style={{ paddingVertical: 0 }}>
              <View
                style={{
                  alignItems: "center",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    height: 5,
                    width: 40,
                    backgroundColor: "#e5e5e5",
                    marginTop: 10,
                    borderRadius: 50,
                  }}
                />
                <Text
                  style={{
                    paddingVertical: 30,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Remove From Cart?
                </Text>
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#e5e5e5",
                  }}
                />

                <View style={{ ...styles.sneakerContainer }}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    source={{ uri: sneaker?.image[0] }}
                  />

                  <View style={{ marginLeft: 20 }}>
                    <Text style={styles.sneakerTitle}>{sneaker?.name}</Text>

                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          ...styles.sneakerSize,
                          marginTop: sneaker?.name?.length > 15 ? 10 : 0,
                        }}
                      >
                        {/* @ts-ignore */}
                        {sneaker?.size}
                      </Text>
                    </View>

                    {sneaker?.offerPrice ? (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            ...styles.sneakerPrice,
                            fontSize: 15,
                            marginRight: 10,
                            textDecorationLine: "line-through",
                            color: "#ccc",
                          }}
                        >
                          {(+sneaker?.price * currentPrice).toLocaleString(
                            "ru-RU",
                            {
                              style: "currency",
                              currency: "RUB",
                            }
                          )}
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
                </View>

                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#e5e5e5",
                  }}
                />

                <View
                  style={{
                    ...styles.containerButton,
                  }}
                >
                  <TouchableHighlight
                    underlayColor={"#c7c7c7"}
                    style={{
                      ...styles.button,
                      backgroundColor: "#e7e7e7",
                    }}
                    onPress={closeBottomSheet}
                  >
                    <Text>Отмена</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={"#393939"}
                    style={{
                      ...styles.button,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      paddingHorizontal: 45,
                    }}
                    onPress={() => {
                      removeCartItem(sneaker);
                      closeBottomSheet();
                      Toast.show({
                        type: "info",
                        text1: "Товар удален из корзины",
                        visibilityTime: 2000,
                        position: "top",
                      });
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Да, удалить</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  sneakerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
    // width: '100%',
  },

  sneakerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    // width: '90%'
  },

  containerButton: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 20,
    marginLeft: -40,
  },

  button: {
    backgroundColor: "#101010",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 60,
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
  },

  sneakerSize: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
});
