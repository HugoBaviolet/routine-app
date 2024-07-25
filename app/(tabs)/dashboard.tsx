// app/(tabs)/dashboard.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Title from '../../components/Title';
import HabitList from '../../components/HabitList';
import AddHabitButton from '../../components/AddHabitButton';
import HabitModal from '../../components/HabitModal';
import { Habit } from '../types'

const DashboardScreen: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewHabit = (newHabit: Habit) => {
    setHabits([...habits, newHabit]);
  };

  return (
    <View style={styles.container}>
      <Title text="Habit Dashboard" />
      <HabitList habits={habits} setHabits={setHabits} />
      <AddHabitButton onPress={() => setIsModalVisible(true)} />
      <HabitModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={addNewHabit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default DashboardScreen;