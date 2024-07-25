import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { Habit } from '../app/types';

interface HabitRowProps {
  habit: Habit;
  onToggleDay: (day: string) => void;
}

const HabitRow: React.FC<HabitRowProps> = ({ habit, onToggleDay }) => {
  const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  const handleDayPress = (day: string) => {
    if (habit.days[day]) {
      Alert.alert(
        "Deselect Day",
        "Are you sure you want to deselect this day?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Confirm", 
            onPress: () => onToggleDay(day),
            style: "destructive"
          }
        ]
      );
    } else {
      onToggleDay(day);
    }
  };

  return (
    <Animated.View style={styles.container}>
      <View style={styles.fixedContent}>
        <Text style={styles.habitName}>{habit.name}</Text>
      </View>
      <Animated.View style={styles.swipeableContent}>
        <View style={styles.centerContainer}>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day) => (
              habit.days.hasOwnProperty(day) && (
                <View key={day} style={styles.dayColumn}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <TouchableOpacity
                    style={[styles.dayBox, habit.days[day] && styles.completedDay]}
                    onPress={() => handleDayPress(day)}
                  />
                </View>
              )
            ))}
          </View>
        </View>
        <View style={styles.streakContainer}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakNumber}>{habit.streak || 0}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  fixedContent: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  swipeableContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 120, // Adjust this value based on the width of your habit name
    paddingRight: 16,
    paddingVertical: 16,
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 5,
    alignItems: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayColumn: {
    alignItems: 'center',
    marginHorizontal: 4,  
  },
  dayLabel: {
    fontSize: 12,
    marginBottom: 4,  
  },
  dayBox: {
    width: 28,  
    height: 28,  
    borderRadius: 8,  
    borderWidth: 1,  
    borderColor: '#007AFF',  
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,  
  },
  completedDay: {
    backgroundColor: '#34C759',  
    borderColor: '#34C759',
  },
  streakContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  streakIcon: {
    fontSize: 20,
    marginRight: -2,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: -5
  },
});

export default HabitRow;