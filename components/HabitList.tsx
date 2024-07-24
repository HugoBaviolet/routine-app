import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import HabitRow from './HabitRow';
import { Habit } from '../app/types';

interface HabitListProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const HabitList: React.FC<HabitListProps> = ({ habits, setHabits }) => {
  const toggleDay = (habitId: string, day: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId
          ? { ...habit, days: { ...habit.days, [day]: !habit.days[day] } }
          : habit
      )
    );
  };

  if (habits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Habits added yet. Start by adding a new habit!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={habits}
      renderItem={({ item }) => (
        <HabitRow
          habitName={item.name}
          days={item.days}
          onToggleDay={(day) => toggleDay(item.id, day)}
          streak={item.streak || 0}  // Add this line
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default HabitList;