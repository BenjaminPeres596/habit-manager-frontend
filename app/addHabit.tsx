import React, { useContext, useState } from 'react';
import { habitListContext } from '@/context/habitContext';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
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
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [description, setDescription] = useState('');

  const handleNewHabit = async () => {
    const newHabit: Habit = {
      id: 0,
      name,
      priority,
      completed: false,
      description,
    };
    setHabits([...habits, newHabit]);
    navigation.navigate('/home');
    const newHabitId = await createHabit(name, priority, description);
    if (newHabitId) {
      newHabit.id = newHabitId;
      setHabits([...habits, newHabit]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nombre del Hábito</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del hábito"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.text}>Prioridad:</Text>
      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'High' && styles.selectedHighPriority]}
          onPress={() => setPriority('High')}
        >
          <Text style={styles.priorityButtonText}>Alta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'Medium' && styles.selectedMediumPriority]}
          onPress={() => setPriority('Medium')}
        >
          <Text style={styles.priorityButtonText}>Media</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'Low' && styles.selectedLowPriority]}
          onPress={() => setPriority('Low')}
        >
          <Text style={styles.priorityButtonText}>Baja</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Agregue una descripción (opcional)</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.cancelButton} onPress={navigation.back}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={() => handleNewHabit()}>
          <Text style={styles.buttonText}>Confirmar</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#D9D9D9',
    color: '#000',
    width: '100%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  priorityButton: {
    width: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 100,
  },
  selectedPriority: {
    backgroundColor: '#ddd',
  },
  selectedHighPriority: {
    backgroundColor: '#F46B6B',
  },
  selectedMediumPriority: {
    backgroundColor: '#FFBC37',
  },
  selectedLowPriority: {
    backgroundColor: '#84F46B',
  },
  priorityButtonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  descriptionInput: {
    textAlignVertical: 'top',

    height: 100,
    backgroundColor: '#D9D9D9',
    color: '#000',
    width: '100%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  cancelButton: {
    width: '30%',
    backgroundColor: '#F46B6B',
    padding: 10,
    borderRadius: 100,
  },
  confirmButton: {
    width: '30%',
    backgroundColor: '#84F46B',
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
});
