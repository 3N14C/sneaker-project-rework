import React, { FC, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import tailwind from "twrnc";
import { ID, account } from "../../appwrite/appwrite";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../context/AuthContext";

export const Register: FC = () => {
  const { signup } = useAuth();
  const [focusedUsername, setFocusedUsername] = React.useState<boolean>(false);
  const [focusedEmail, setFocusedEmail] = useState<boolean>(false);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      try {
        await signup({
          name: getValues().username,
          email: getValues().email,
          password: getValues().password,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const schema = z.object({
    username: z.string({ invalid_type_error: "Username must be a string" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(9, { message: "Password must be at least 9 characters" }),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <Text style={styles.title}>Create Your Account</Text>
      </Animated.View>

      <View>
        {/* TODO: Input */}
        <View style={styles.input_fileds}>
          {/* <View
            style={{
              ...styles.input_filed_item,
              borderColor: focusedUsername ? "black" : "lightgray",
              paddingVertical: focusedUsername ? 15 : 10,
            }}
          >
            <Icon
              style={{ marginRight: 10 }}
              color={focusedUsername ? "black" : "lightgray"}
              size={20}
              solid={true}
              name="user"
            />
            <Controller
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  //   onFocus={() => setFocusedUsername(true)}
                  //   onBlur={() => setFocusedUsername(false)}
                  style={styles.input}
                  placeholder="lastname"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="lastname"
            />
          </View> */}

          <View
            style={{
              ...styles.input_filed_item,
              borderColor: focusedUsername ? "black" : "lightgray",
              paddingVertical: focusedUsername ? 15 : 10,
            }}
          >
            <Icon
              style={{ marginRight: 10 }}
              color={focusedUsername ? "black" : "lightgray"}
              size={20}
              solid={true}
              name="user"
            />
            <Controller
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  onFocus={() => setFocusedUsername(true)}
                  onBlur={() => setFocusedUsername(false)}
                  style={styles.input}
                  placeholder="username"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
          </View>
          {errors.username && (
            <Text style={tailwind`text-red-500`}>
              {errors.username.message}
            </Text>
          )}

          <View
            style={{
              ...styles.input_filed_item,
              borderColor: focusedEmail ? "black" : "lightgray",
              paddingVertical: focusedEmail ? 15 : 10,
            }}
          >
            <Icon
              style={{ marginRight: 10 }}
              color={focusedEmail ? "black" : "lightgray"}
              size={20}
              solid={true}
              name="envelope"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onFocus={() => setFocusedEmail(true)}
                  onBlur={() => setFocusedEmail(false)}
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text style={tailwind`text-red-500`}>{errors.email.message}</Text>
          )}

          <View
            style={{
              ...styles.input_filed_item,
              borderColor: focusedPassword ? "black" : "lightgray",
              paddingVertical: focusedPassword ? 15 : 10,
            }}
          >
            <Icon
              style={{ marginRight: 10 }}
              color={focusedPassword ? "black" : "lightgray"}
              size={20}
              solid={true}
              name="lock"
            />
            <Controller
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  onFocus={() => setFocusedPassword(true)}
                  onBlur={() => setFocusedPassword(false)}
                  secureTextEntry={secureTextEntry}
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            <Icon
              color={focusedPassword ? "black" : "lightgray"}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              name={secureTextEntry ? "eye-slash" : "eye"}
              size={18}
            />
          </View>
          {errors.password && (
            <Text style={tailwind`text-red-500`}>
              {errors.password.message}
            </Text>
          )}
        </View>

        <TouchableHighlight
          style={styles.touch_button}
          underlayColor={"#393939"}
          onPress={handleSubmit(async () => {
            await mutateAsync();
          })}
        >
          {isPending ? (
            <Text style={styles.touch_button_title}>Loading...</Text>
          ) : (
            <Text style={styles.touch_button_title}>Register</Text>
          )}
        </TouchableHighlight>

        <View style={styles.another_block}>
          <View style={styles.register_block}>
            <Text style={styles.register_title}>Already have an account?</Text>
            <Text
              // @ts-ignore
              onPress={() => navigation.navigate("Login")}
              style={styles.register_button}
            >
              Sign in
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 200,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },

  touch_button: {
    marginTop: 70,
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 50,
  },

  touch_button_title: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },

  text_reset_password: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    alignItems: "center",
  },

  another_block: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  register_block: {
    // marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  register_title: {
    color: "#9e9e9e",
    fontWeight: "400",
    fontSize: 15,
  },

  register_button: {
    marginLeft: 10,
    color: "black",
    fontWeight: "600",
  },

  input_fileds: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  input_filed_item: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: 350,
    borderColor: "lightgray",
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
});
