import { habitListContext } from '@/context/habitContext';
import { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';


export default function addTaskScreen() {
  const context = useContext(habitListContext);

  if (!context) {
    throw new Error('useHabitList must be used within a HabitListProvider');
  }

  const { habits, setHabits } = context;

  function handleNewHabit() {
    console.log('Add habit button pressed');
    const newHabit = {
      id: habits.length + 1,
      name: 'New Habit',
      priority: 'Low' as 'Low',
      completed: false,
    };
    setHabits([...habits, newHabit]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>add task screen</Text>
      <Button title="agregar hábito" onPress={handleNewHabit}></Button>
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
