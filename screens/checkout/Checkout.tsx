import { FC, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { useCartStore } from "../../store/cart-store/store";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useCurrentPrice } from "../../hooks/useCurrentPrice";
import { useNavigation } from "@react-navigation/native";
import { ModalAddress } from "../../components/ModalAddress";
import { ModalPortal } from "react-native-modals";
import { useAddressStore } from "../../store/address/store";

export const Checkout: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { addressItems } = useAddressStore();

  const { navigate } = useNavigation();
  const { cartItems } = useCartStore();
  const currentPrice = useCurrentPrice();

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

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{ ...styles.addressTitle }}>Адрес доставки</Text>

          {modalVisible && (
            <ModalAddress
              modalVisible={modalVisible}
              closeBottomSheet={handleCloseModal}
            />
          )}
          <TouchableOpacity
            onPress={handleOpenModal}
            style={{
              ...styles.address,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#ccc",
                  padding: 5,
                  borderRadius: 50,
                }}
              >
                <Icon
                  name="map-marker"
                  size={20}
                  color="white"
                  style={{
                    backgroundColor: "black",
                    paddingVertical: 3,
                    paddingHorizontal: 8,
                    borderRadius: 50,
                  }}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {addressItems.city}
                </Text>

                <View
                  style={{
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <Text style={{ ...styles.addressDescr }}>
                    {addressItems.street}
                  </Text>

                  <Text style={{ ...styles.addressDescr }}>
                    {addressItems.zipCode}
                  </Text>
                </View>
              </View>

              <TouchableOpacity>
                <Icon name="pencil" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.line }} />

        <View style={{ ...styles.orderContainer }}>
          <Text style={{ ...styles.addressTitle }}>Список товаров</Text>

          {cartItems.map((sneaker) => (
            <View
              style={{
                backgroundColor: "#fff",
                marginBottom: 20,
                borderRadius: 20,
                marginTop: 20,
              }}
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
                          maxWidth: 150,
                        }}
                      >
                        {sneaker.name}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          ...styles.sneakerSize,
                          marginTop: sneaker.name.length > 15 ? 10 : 0,
                        }}
                      >
                        {/* @ts-ignore */}
                        {sneaker.size}
                      </Text>
                    </View>

                    <View>
                      <Text style={{ ...styles.sneakerPrice }}>
                        {sneaker?.offer ? (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
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
                            {(sneaker.price * currentPrice).toLocaleString(
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              padding: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "#ccc",
              }}
            >
              Total
            </Text>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "gray",
              }}
            >
              {totalPrice.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}
            </Text>
          </View>

          <TouchableHighlight
            onPress={() => {
              // @ts-ignore
              navigate("Payment");
            }}
            underlayColor={"#393939"}
            style={{
              backgroundColor: "black",
              paddingVertical: 20,
              alignItems: "center",
              borderRadius: 50,
              marginTop: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Перейти к оплате
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <ModalPortal />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "rgb(251, 251, 251)",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  addressTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  address: {
    marginVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  addressDescr: {
    color: "#ccc",
    fontSize: 12,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  orderContainer: {
    marginVertical: 30,
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
