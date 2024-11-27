import React, { useState } from 'react';
import { habitListContext } from '@/context/habitContext';
import { useContext } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';


export default function AddTaskScreen() {
  const navigation = useRouter();

  const context = useContext(habitListContext);

  if (!context) {
    throw new Error('useHabitList must be used within a HabitListProvider');
  }

  const { habits, setHabits } = context;

  // Estados locales para manejar los inputs
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Low');
  const [completed, setCompleted] = useState(false);


  function handleNewHabit() {
    const newHabit = {
      id: habits.length + 1,
      name,
      priority,
      completed,
    };

    setHabits([...habits, newHabit]);

    // Reiniciar los inputs
    setName('');
    setPriority('Low');
    setCompleted(false);

    navigation.navigate('/home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agregar nuevo hábito</Text>

      {/* Input para el nombre del hábito */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del hábito"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      {/* Selector de prioridad */}
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
      </View>

      {/* Botón para agregar el hábito */}
      <Button title="Agregar hábito" onPress={handleNewHabit} />

      <Text style={styles.text}>Hábito agregado: {name}</Text>
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
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
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
