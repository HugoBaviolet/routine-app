import { Text, View, StyleSheet } from "react-native";
import Title from "@/components/Title";

export default function ProfileScreen() {
  return (
    <View
      style={styles.container}
    >
      <Title
      text="Profile"
      />
      <Text>Profile Screen</Text>
      <Text>Here the user will be able to access the settings as well as profile changes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});