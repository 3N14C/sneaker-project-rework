import { Button } from "@rneui/base";
import { FC, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import LoadingScreen from "../../components/LoadingScreen";
import { ProfileSettings } from "./_components/ProfileSettings";

export const Profile: FC = () => {
  const { logout, user, loading } = useAuth();

  const { navigate } = useNavigation();

  useEffect(() => {
    if (!user) {
      // @ts-ignore
      navigate("Login");
    }
  }, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.containerInner,
        }}
      >
        <View>
          {/* <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: avatar !== null ? avatar : data.avatar }}
          /> */}
          <TouchableOpacity
            onPress={() => {
              // handleImageUpload()
            }}
          >
            <Icon
              name="edit"
              size={20}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.username}>{user?.name}</Text>
      </View>

      <View style={{ ...styles.line }} />

      <ProfileSettings
        editProfile={() => {
          // @ts-ignore
          navigate("EditProfile");
        }}
        editPayment={() => {
          // @ts-ignore
          navigate("EditPayment");
        }}
        logout={logout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  containerInner: {
    justifyContent: "center",
    alignItems: "center",
  },

  username: {
    fontWeight: "bold",
    fontSize: 20,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
  },
});
