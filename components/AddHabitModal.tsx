// components/AddHabitModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from '../app/types';

interface AddHabitModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (habit: Habit) => void;
  }
  
  const AddHabitModal: React.FC<AddHabitModalProps> = ({ visible, onClose, onAdd }) => {
    const [habitName, setHabitName] = useState('');
    const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});
    const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  
    const toggleDay = (day: string) => {
      setSelectedDays(prev => ({
        ...prev,
        [day]: !prev[day]
      }));
    };
  
    const handleAdd = () => {
        if (habitName.trim() === '') return;
        const newHabit: Habit = {
          id: Date.now().toString(),
          name: habitName,
          days: Object.fromEntries(
            Object.entries(selectedDays)
              .filter(([_, value]) => value)
              .map(([key, _]) => [key, false])  // Set all selected days to false initially
          ),
          streak: 0,
        };
        onAdd(newHabit);
        setHabitName('');
        setSelectedDays({});
        onClose();
      };
  
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add New Habit</Text>
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
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add Habit</Text>
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
    addButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    addButtonText: {
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

export default AddHabitModal;