import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import HabitRow from './HabitRow';
import HabitModal from './HabitModal';
import { Habit } from '../app/types';

interface HabitListProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const HabitList: React.FC<HabitListProps> = ({ habits, setHabits }) => {
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const toggleDay = (habitId: string, day: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId
          ? { ...habit, days: { ...habit.days, [day]: !habit.days[day] } }
          : habit
      )
    );
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== habitId));
  };

  const openEditModal = (habit: Habit) => {
    setEditingHabit(habit);
  };

  const closeEditModal = () => {
    setEditingHabit(null);
  };

  const saveEditedHabit = (editedHabit: Habit) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === editedHabit.id ? editedHabit : habit
      )
    );
    closeEditModal();
  };

  const renderItem = (data: { item: Habit }, rowMap: any) => (
    <HabitRow
      habit={data.item}
      onToggleDay={(day) => toggleDay(data.item.id, day)}
    />
  );

  const renderHiddenItem = (data: { item: Habit }, rowMap: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => openEditModal(data.item)}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteHabit(data.item.id)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (habits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Habits added yet. Start by adding a new habit!</Text>
      </View>
    );
  }

  return (
    <>
      <SwipeListView
        data={habits}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        disableRightSwipe
        keyExtractor={(item) => item.id}
        useNativeDriver={false}
      />
      <HabitModal
        visible={editingHabit !== null}
        onClose={closeEditModal}
        onSave={saveEditedHabit}
        habit={editingHabit || undefined}
      />
    </>
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

export default HabitList;