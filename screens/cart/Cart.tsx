import { FC, useMemo, useState } from "react";
import {
  Image,
  LogBox,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useCartStore } from "../../store/cart-store/store";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { useCurrentPrice } from "../../hooks/useCurrentPrice";
import Toast from "react-native-toast-message";
import { RemoveModal } from "../../components/RemoveModal";
import { ModalPortal } from "react-native-modals";

export const Cart: FC = () => {
  const { cartItems } = useCartStore();
  const { setParams, navigate } = useNavigation();
  const currentPrice = useCurrentPrice();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const openBottomSheet = () => {
    setModalVisible(true);
  };
  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return (
        total +
        (item.offer.discount
          ? item.price * (1 - item.offer.discount / 100) * currentPrice
          : +item.price * currentPrice)
      );
    }, 0);
  }, [cartItems, currentPrice]);

  const handleAddToOrder = () => {
    if (cartItems?.length > 0) {
      // @ts-ignore
      navigate("Checkout");
    } else {
      Toast.show({
        type: "error",
        text1: "Корзина пуста!",
        visibilityTime: 2000,
        position: "top",
      });
    }
  };

  return (
    <>
      <View style={{ ...styles.container }}>
        {modalVisible && (
          <RemoveModal
            modalVisible={modalVisible}
            closeBottomSheet={closeBottomSheet}
          />
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 120 }}
        >
          {cartItems?.map((sneaker) => (
            <View
              style={{ backgroundColor: "#fff", marginBottom: 20 }}
              key={sneaker.$id}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 20,
                  paddingTop: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <Icon
                  size={18}
                  name="trash"
                  onPress={() => {
                    //@ts-ignore
                    setParams({
                      sneaker: sneaker,
                    });
                    openBottomSheet();
                  }}
                  style={{
                    position: "absolute",
                    right: -10,
                    top: 20,
                    zIndex: 22,
                    width: 40,
                    height: 40,
                  }}
                />
                <View style={{ ...styles.container_sneaker }}>
                  <Image
                    width={100}
                    style={{ paddingBottom: 100 }}
                    source={{ uri: sneaker.image[0] }}
                  />
                </View>

                <View>
                  <View
                    style={{
                      marginLeft: 20,
                    }}
                  >
                    <View style={{}}>
                      <Text
                        style={{
                          marginRight: 10,
                          fontWeight: "bold",
                          fontSize: 15,
                          width: "90%",
                        }}
                      >
                        {sneaker.name.length > 15
                          ? sneaker.name.slice(0, 15) + "..."
                          : sneaker.name}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          ...styles.sneakerSize,
                          marginTop: sneaker.name.length > 15 ? 10 : 10,
                        }}
                      >
                        {/* @ts-ignore */}
                        {sneaker.size}
                      </Text>
                    </View>

                    <View>
                      <Text style={{ ...styles.sneakerPrice }}>
                        {sneaker?.offer.discount ? (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
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
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.containerOrder]}>
          <View>
            <Text style={{ color: "#adadab", fontSize: 12 }}>
              Итоговая цена
            </Text>
            <Text
              style={{ color: "#222223", fontWeight: "bold", fontSize: 25 }}
            >
              {totalPrice.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}
            </Text>
          </View>

          <TouchableHighlight
            underlayColor={"#393939"}
            onPress={() => {
              handleAddToOrder();
            }}
            style={{
              ...styles.button,
              backgroundColor:
                cartItems?.length === 0 ? "rgba(0, 0, 0, 0.3)" : "#101010",
            }}
            disabled={cartItems?.length === 0}
          >
            <View style={styles.buttonInner}>
              <Text style={{ color: "#fff", fontSize: 18 }}>Подтвердить</Text>
              <Icon style={{ color: "#fff" }} name="arrow-right" size={20} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

LogBox.ignoreLogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 20,
    paddingTop: 0,
    position: "relative",
  },

  button: {
    backgroundColor: "#101010",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container_sneaker: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
  },

  sneakerSize: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#000",
  },

  containerOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "110%",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderTopWidth: 0.2,
    borderColor: "rgba(0,0,0,0.1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 120,
    alignItems: "center",
  },
});
