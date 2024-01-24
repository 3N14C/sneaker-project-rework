import { StyleSheet, Text, View } from "react-native"
import { Navbar } from "./_components/Navbar";

export const Popular = () => {
    return (
      <View style={styles.container}>
        <View style={styles.container_inner}>
          <Text style={styles.title}>Популярное</Text>
        </View>

        <View>
          <Navbar />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  container_inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});