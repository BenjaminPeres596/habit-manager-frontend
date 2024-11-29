import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { habitListContext } from '../context/habitContext'; // Adjust the import path as needed
import { deleteHabit } from '@/services/habit'; // Adjust the import path as needed

export default function HabitDetailsScreen() {
  const { id } = useLocalSearchParams(); // Access the habit ID from the query parameters
  const context = useContext(habitListContext);
  const navigation = useRouter();

  if (!context) {
    return null; // or handle the error appropriately
  }

  const { habits, setHabits } = context;
  const habit = habits.find(h => h.id === Number(id)); // Find the habit with the matching ID

  const handleDelete = async () => {
    console.log('Delete button pressed');
    if (habit) {
      setHabits(habits.filter(h => h.id !== habit.id));
      navigation.navigate("/home");
      await deleteHabit(habit.id);
    }
  };

  const handleComplete = () => {
    if (habit) {
      setHabits(habits.map(h => h.id === habit.id ? { ...h, completed: !h.completed } : h));
    }
  };

  const handlePriorityChange = (newPriority: 'High' | 'Medium' | 'Low') => {
    if (habit) {
      setHabits(habits.map(h => h.id === habit.id ? { ...h, priority: newPriority } : h));
    }
  };

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Habit not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.habitName}>{habit.name}</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.text}>{habit.description}</Text>
      </View>
      <View style={styles.priorityContainer}>
        <Text style={styles.text}>Prioridad:</Text>
        <TouchableOpacity
          style={[styles.priorityButton, habit.priority === 'High' && styles.selectedPriority]}
          onPress={() => handlePriorityChange('High')}
        >
          <Text style={styles.priorityButtonText}>High</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, habit.priority === 'Medium' && styles.selectedPriority]}
          onPress={() => handlePriorityChange('Medium')}
        >
          <Text style={styles.priorityButtonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, habit.priority === 'Low' && styles.selectedPriority]}
          onPress={() => handlePriorityChange('Low')}
        >
          <Text style={styles.priorityButtonText}>Low</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.buttonText}>Completar {habit.completed ? '✓' : '[]'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  habitName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  descriptionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  priorityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedPriority: {
    backgroundColor: '#ddd',
  },
  priorityButtonText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  completeButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
