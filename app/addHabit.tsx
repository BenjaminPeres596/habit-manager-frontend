import React, { useContext, useState } from 'react';
import { habitListContext } from '@/context/habitContext';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createHabit } from '@/services/habit';
import { Habit } from '@/types/types';
import { useRouter } from 'expo-router';


export default function AddTaskScreen() {
  const navigation = useRouter();

  const context = useContext(habitListContext);

  if (!context) {
    throw new Error('useHabitList must be used within a HabitListProvider');
  }

  const { habits, setHabits } = context;

  const [name, setName] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Low');
  const [description, setDescription] = useState('');

  const handleNewHabit = async () => {
    const newHabitId = await createHabit(name, priority, description);
    if (newHabitId !== false) {
      const newHabit: Habit = {
        id: newHabitId,
        name,
        priority,
        completed: false,
        description,
      };
      setHabits([...habits, newHabit]);
      setName('');
      setPriority('Low');
      setDescription('');
    }
    navigation.navigate('/home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agregar nuevo hábito</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del hábito"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.text}>Prioridad:</Text>
        <Picker
          selectedValue={priority}
          style={styles.picker}
          onValueChange={(itemValue) => setPriority(itemValue as 'High' | 'Medium' | 'Low')}
        >
          <Picker.Item label="Alta" value="High" />
          <Picker.Item label="Media" value="Medium" />
          <Picker.Item label="Baja" value="Low" />
        </Picker>
      <Text style={styles.text}>Agregue una descripción (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Button title="Agregar hábito" onPress={handleNewHabit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
