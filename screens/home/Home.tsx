import { FC, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Header } from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { Offer } from "./_components/offer/Offer";
import { useNavigation } from "@react-navigation/native";
import { Brand } from "./_components/brand/Brand";

export const Home: FC = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState<string>("");
  const { navigate } = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* {data.role !== "ADMIN" ? (
          <>
            <Header
              avatar={data.avatar}
              username={data.username}
              role={data.role}
            />

            <Search
              search={search}
              setSearch={setSearch}
              getSneakerData={sneakerData}
            />

            {search.length === 0 && (
              <>
                <View style={styles.offer}>
                  <Text style={styles.title}>Специальные предложения</Text>

                  <TouchableHighlight
                    underlayColor={"transparent"}
                    
                    onPress={() => navigate("Special Offers")}
                  >
                    <Text
                      style={{
                        ...styles.title,
                        fontSize: 15,
                        maxWidth: "100%",
                        padding: 20,
                      }}
                    >
                      Посмотреть все
                    </Text>
                  </TouchableHighlight>
                </View>

                <Offer />

                <Brand />

                <Popular />
              </>
            )}
            <StatusBar />
          </>
        ) : (
          <>
            <HomeAdmin />
          </>
        )} */}

        <>
          <Header avatar={""} username={user?.name || ""} />

          {/* <Search
            search={search}
            setSearch={setSearch}
            getSneakerData={sneakerData}
          /> */}

          {search.length === 0 && (
            <>
              <View style={styles.offer}>
                <Text style={styles.title}>Специальные предложения</Text>

                <TouchableHighlight
                  underlayColor={"transparent"}
                  //@ts-expect-error
                  onPress={() => navigate("Special Offers")}
                >
                  <Text
                    style={{
                      ...styles.title,
                      fontSize: 15,
                      maxWidth: "100%",
                      padding: 20,
                    }}
                  >
                    Посмотреть все
                  </Text>
                </TouchableHighlight>
              </View>

              <Offer />

              <Brand />

              {/* <Popular />  */}
            </>
          )}
          <StatusBar />
        </>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 30,
    height: "100%",
    backgroundColor: "#fff",
  },

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

  title: {
    maxWidth: "40%",
    fontSize: 20,
    fontWeight: "bold",
  },

  offer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
