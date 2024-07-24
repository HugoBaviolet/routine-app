import { Text, View, StyleSheet } from "react-native";
import Title from "@/components/Title";
import { useState } from "react";
import HabitList from '../../components/HabitList'
import AddHabitButton from '../../components/AddHabitButton';
import { Habit } from "../types";

const DashboardScreen: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const addNewHabit = () =>{
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: `New Habit ${habits.length + 1}`,
      days: [false, false, false, false, false, false, false],
    };
    setHabits([...habits,newHabit])
  }
  return (
    <View
      style={styles.container}
    >
      <Title
      text="Habit Dashboard"
      />
      <HabitList habits={habits} setHabits={setHabits} />
      <AddHabitButton onPress={addNewHabit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DashboardScreen