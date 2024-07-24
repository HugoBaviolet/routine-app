import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface HabitRowProps {
  habitName: string;
  days: { [key: string]: boolean };
  onToggleDay: (day: string) => void;
  streak: number;  
}

const HabitRow: React.FC<HabitRowProps> = ({ habitName, days, onToggleDay, streak }) => {
  const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  const handleDayPress = (day: string) => {
    if (days[day]) {
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
    <View style={styles.container}>
      <Text style={styles.habitName}>{habitName}</Text>
      <View style={styles.centerContainer}>
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day) => (
            days.hasOwnProperty(day) && (
              <View key={day} style={styles.dayColumn}>
                <Text style={styles.dayLabel}>{day}</Text>
                <TouchableOpacity
                  style={[styles.dayBox, days[day] && styles.completedDay]}
                  onPress={() => handleDayPress(day)}
                />
              </View>
            )
          ))}
        </View>
      </View>
      <View style={styles.streakContainer}>
        <Text style={styles.streakIcon}>🔥</Text>
        <Text style={styles.streakNumber}>{streak}</Text>
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
      flex: 2,
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