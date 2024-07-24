import Title from "@/components/Title";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Title
      text="Home"
      />
      <Text>Home Screen</Text>
      <Text>On the home screen we can offer reminders, suggestions, motivation, tips and general progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});