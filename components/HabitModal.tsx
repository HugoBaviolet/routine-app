import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from '../app/types';

interface HabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (habit: Habit) => void;
  habit?: Habit;
}

const HabitModal: React.FC<HabitModalProps> = ({ visible, onClose, onSave, habit }) => {
  const [habitName, setHabitName] = useState('');
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});
  const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  useEffect(() => {
    if (habit) {
      setHabitName(habit.name);
      // Initialize selectedDays with existing habit days
      const initialSelectedDays = daysOfWeek.reduce((acc, day) => {
        acc[day] = day in habit.days;
        return acc;
      }, {} as { [key: string]: boolean });
      setSelectedDays(initialSelectedDays);
    } else {
      setHabitName('');
      setSelectedDays(daysOfWeek.reduce((acc, day) => {
        acc[day] = false;
        return acc;
      }, {} as { [key: string]: boolean }));
    }
  }, [habit]);

  const toggleDay = (day: string) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleSave = () => {
    if (habitName.trim() === '') return;
    const savedHabit: Habit = {
      id: habit ? habit.id : Date.now().toString(),
      name: habitName,
      days: Object.entries(selectedDays).reduce((acc, [day, isSelected]) => {
        if (isSelected) {
          acc[day] = habit?.days[day] ?? false;
        }
        return acc;
      }, {} as { [key: string]: boolean }),
      streak: habit ? habit.streak : 0,
    };
    onSave(savedHabit);
    setHabitName('');
    setSelectedDays({});
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{habit ? 'Edit Habit' : 'Add New Habit'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Habit Name"
            value={habitName}
            onChangeText={setHabitName}
          />
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayButton, selectedDays[day] && styles.selectedDay]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[styles.dayText, selectedDays[day] && styles.selectedDayText]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{habit ? 'Save Changes' : 'Add Habit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};



const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dayButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    color: '#007AFF',
  },
  selectedDayText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007AFF',
  },
});

export default HabitModal;
