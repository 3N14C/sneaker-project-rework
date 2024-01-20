import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import tailwind from "twrnc";

interface HeaderProps {
  username: string;
  avatar: string;
}

export const Header: FC<HeaderProps> = ({ username, avatar }) => {
  const { navigate } = useNavigation();

  return (
    <View style={tailwind`mt-10`}>
      <View style={styles.container_inner}>
        <View style={styles.profile}>
          <Image
            style={{ width: 35, height: 35, borderRadius: 50 }}
            source={{ uri: avatar }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>С возвращением 👋</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>

        <View style={styles.toolbar}>
          <Icon style={{ marginRight: 20 }} name="bell" size={25} />
          <Icon
            //@ts-ignore
            onPress={() => navigate("FavouriteList")}
            name="heart"
            size={25}
          />
        </View>
      </View>

      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container_inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: "gray",
  },

  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
  },
});
