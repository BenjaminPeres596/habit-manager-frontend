import { Text, View, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext } from 'react';
import { habitListContext } from '../context/habitContext'; // Adjust the import path as needed
import { deleteHabit } from '@/services/habit';

export default function TaskDetailsScreen() {
  const navigation = useRouter();

  const { id } = useLocalSearchParams(); // Access the habit ID from the query parameters

  const context = useContext(habitListContext);

  if (!context) {
    throw new Error('useHabitList must be used within a HabitProvider');
  }

  const { habits, setHabits } = context;

  const habit = habits.find(h => h.id === Number(id)); // Find the habit with the matching ID

  function handleDelete() {
    // Implement the delete logic here
    console.log('Delete button pressed');
    if (habit) {
      setHabits(habits.filter(h => h.id !== habit.id));
      deleteHabit(habit.id);
      navigation.navigate("/home")
    }
    
  }

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Habit not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task Details Screen</Text>
      <Text style={styles.text}>Habit ID: {habit.id}</Text>
      <Text style={styles.text}>Nombre: {habit.name}</Text>
      <Text style={styles.text}>Prioridad: {habit.priority}</Text>
      <Text style={styles.text}>Descripción: {habit.description}</Text>
      <Text style={styles.text}>Completada: {habit.completed ? 'Si' : 'No'}</Text>
      <Button title="eliminar" onPress={handleDelete}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
