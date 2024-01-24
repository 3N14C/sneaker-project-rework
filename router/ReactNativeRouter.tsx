import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login } from "../screens/auth/Login";
import { Register } from "../screens/auth/Register";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Category } from "../screens/category/Category";
import UserRouter from "./components/UserRouter";
import { ModalPortal } from "react-native-modals";
import { Favorite } from "../screens/favorite/Favorite";
import { SpecialOffers } from "../screens/offers/SpecialOffers";
import { SneakerOffer } from "../screens/[sneakerOffer]/SneakerOffer";
import { Checkout } from "../screens/checkout/Checkout";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const ReactNativeRouter: FC = ({}) => {
  // COUNTER FOR NAVIGATION
  //   const cartSneaker = useSelector(selectCartItems);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Group>
            <Stack.Screen
              options={{ animation: "slide_from_left", headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ animation: "slide_from_right", headerShown: false }}
              name="Register"
              component={Register}
            />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen
              options={{
                animation: "fade",
                animationDuration: 3000,
                headerShown: false,
              }}
              name="Home"
            >
              {() => <UserRouter />}
              {/* {({ route }) => (
                <>
                  {route?.params ? (
                    <UserRouter params={route?.params} />
                  ) : (
                    <AdminRouter params={route?.params} />
                  )}
                </>
              )} */}
            </Stack.Screen>
          </Stack.Group>

          <Stack.Group
            screenOptions={{ headerShown: true, headerShadowVisible: false }}
          >
            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="Special Offers"
              component={SpecialOffers}
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerTitle: "Discount",
              }}
              name="SneakerOffer"
              component={SneakerOffer}
            />

            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerTitle: () => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name="heart"
                        solid
                        size={20}
                        color="red"
                        style={{ marginRight: 10 }}
                      />
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        Желания
                      </Text>
                    </View>
                  );
                },
              }}
              name="FavouriteList"
              component={Favorite}
            />

            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="Category"
              component={Category}
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerTitle: "Подтверждение",
              }}
              name="Checkout"
              component={Checkout}
            />
            {/* <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerTitle: "Способ оплаты",
              }}
              name="Payment"
            >
              {({ route }) => (
                <>
                  <Payment userData={route?.params} />
                </>
              )}
            </Stack.Screen> */}
          </Stack.Group>

          {/* EDIT PROFILE */}
          {/* <Stack.Group
            screenOptions={{ headerShown: true, headerShadowVisible: false }}
          >
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerTitle: "Оплата",
                headerShadowVisible: false,
              }}
              name="SettingsPayment"
              children={({ route }) => (
                <>
                  <SettingsPayment route={route} />
                </>
              )}
            />
            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="EditProfile"
              component={EditProfile}
            />
            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="AddCard"
              component={AddCard}
            />
          </Stack.Group> */}

          {/* ORDER */}
          {/* <Stack.Group>
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: "Статус заказа",
              }}
              name="TrackOrder"
              children={({ route }) => (
                <>
                  <TrackOrder route={route} />
                </>
              )}
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: "Квитанция",
              }}
              name="Квитанция"
              component={Receipt}
            />
          </Stack.Group> */}

          {/* {/* HISTORY */}
          {/* <Stack.Group>
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerShadowVisible: false,
                headerTitle: "История платежей",
              }}
              name="HistoryPayment"
              component={History}
            />
          </Stack.Group> */}
        </Stack.Navigator>
      </NavigationContainer>
      <ModalPortal />
    </>
  );
};
