import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AddHabitButtonProps {
    onPress: () => void;
}

const AddHabitButton: React.FC<AddHabitButtonProps> = ({onPress}) => {
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Add New Habit</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      margin: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default AddHabitButton;