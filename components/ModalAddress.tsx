import { FC, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Animated,
  Button,
  Easing,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "react-native";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { z } from "zod";
import { IAddress } from "../interfaces/store/address.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { TouchableOpacity } from "react-native";
import { useAddressStore } from "../store/address/store";
import DropDownPicker from "react-native-dropdown-picker";
import tailwind from "twrnc";
import { ArrowDown } from "lucide-react-native";

interface IProps {
  modalVisible: boolean;
  closeBottomSheet: () => void;
}

export const ModalAddress: FC<IProps> = ({
  modalVisible,
  closeBottomSheet,
}) => {

  const bounceValue = useRef(new Animated.Value(0)).current;
  const { addAddress, addressItems } = useAddressStore();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, [bounceValue]);

  const schema = z.object({
    city: z.string({
      invalid_type_error: "Город должен быть строкой",
      required_error: "Город обязателен",
    }),
    street: z.string({
      invalid_type_error: "Улица должна быть строкой",
      required_error: "Улица обязательна",
    }),
    zipCode: z
      .string({
        required_error: "Почтовый код обязателен",
      })
      .min(6, "Почтовый код должен содержать минимум 6 цифр"),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<IAddress>({
    resolver: zodResolver(schema),
  });

  return (
    <BottomModal
      onSwipeOut={() => closeBottomSheet()}
      swipeThreshold={100}
      visible={modalVisible}
      modalStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
      modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      onHardwareBackPress={() => true}
    >
      <ModalContent>
        <KeyboardAvoidingView
          behavior="height"
          enabled
          keyboardVerticalOffset={60}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: bounceValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 10],
                  }),
                },
              ],
            }}
          >
            <ArrowDown
              size={20}
              style={{ alignSelf: "center", marginTop: 20 }}
              color="black"
            />
          </Animated.View>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text>Адрес доставки</Text>

            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Город"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    width: "100%",
                    marginTop: 20,
                    padding: 10,
                    borderRadius: 5,
                  }}
                />
              )}
            />

            <Text style={{ color: "red" }}>
              {errors.city && errors.city.message}
            </Text>

            <Controller
              control={control}
              name="street"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Улица"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    width: "100%",
                    marginTop: 20,
                    padding: 10,
                    borderRadius: 5,
                  }}
                />
              )}
            />

            <Text style={{ color: "red" }}>
              {errors.street && errors.street.message}
            </Text>

            <Controller
              control={control}
              name="zipCode"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType="numeric"
                  maxLength={6}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Почтовый индекс"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    width: "100%",
                    marginTop: 20,
                    padding: 10,
                    borderRadius: 5,
                  }}
                />
              )}
            />

            <Text style={{ color: "red" }}>
              {errors.zipCode && errors.zipCode.message}
            </Text>

            <TouchableOpacity
              onPress={handleSubmit((data) => {
                addAddress(data);
                closeBottomSheet();
              })}
              style={{
                backgroundColor: "#000",
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 5,
                marginVertical: 40,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Сохранить
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ModalContent>
    </BottomModal>
  );
};
