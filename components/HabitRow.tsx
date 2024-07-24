// components/HabitRow.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HabitRowProps {
  habitName: string;
  days: boolean[];
  onToggleDay: (index: number) => void;
}

const HabitRow: React.FC<HabitRowProps> = ({ habitName, days, onToggleDay }) => {
  const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  return (
    <View style={styles.container}>
      <Text style={styles.habitName}>{habitName}</Text>
      <View style={styles.daysContainer}>
        {days.map((completed, index) => (
          <View key={index} style={styles.dayColumn}>
            <Text style={styles.dayLabel}>{daysOfWeek[index]}</Text>
            <TouchableOpacity
              style={[styles.dayBox, completed && styles.completedDay]}
              onPress={() => onToggleDay(index)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  habitName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayColumn: {
    alignItems: 'center',
    marginHorizontal: 2,
  },
  dayLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  dayBox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
  completedDay: {
    backgroundColor: 'green',
  },
});

export default HabitRow;