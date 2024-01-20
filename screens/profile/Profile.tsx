import { Button } from "@rneui/base";
import { FC } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../components/LoadingScreen";

export const Profile: FC = () => {
  const { logout, user, loading } = useAuth();

  const { navigate } = useNavigation();

  console.log(user);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <Text>Profile</Text>

      <Button
        onPress={() => {
          logout();
          // @ts-ignore
          navigate("Login");
        }}
        title={"logout"}
      />
    </View>
  );
};
