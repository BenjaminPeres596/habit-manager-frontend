import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { habitListContext } from '../context/habitContext'; // Adjust the import path as needed
import { deleteHabit, updateHabit } from '@/services/habit'; // Adjust the import path as needed

export default function HabitDetailsScreen() {
  const { id } = useLocalSearchParams(); // Access the habit ID from the query parameters
  const context = useContext(habitListContext);
  const navigation = useRouter();

  if (!context) {
    return null; // or handle the error appropriately
  }

  const { habits, setHabits } = context;
  const habit = habits.find(h => h.id === Number(id)); // Find the habit with the matching ID

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(habit?.name || '');
  const [editedDescription, setEditedDescription] = useState(habit?.description || '');
  const [editedPriority, setEditedPriority] = useState(habit?.priority || 'Low');

  const handleDelete = async () => {
    console.log('Delete button pressed');
    if (habit) {
      setHabits(habits.filter(h => h.id !== habit.id));
      navigation.navigate("/home");
      await deleteHabit(habit.id);
    }
  };

  const handleSaveChanges = () => {
    if (habit) {
      setHabits(habits.map(h => h.id === habit.id ? { ...h, name: editedName, description: editedDescription, priority: editedPriority } : h));
      setIsEditing(false);
      updateHabit(habit.id, editedName, editedPriority, editedDescription);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(habit?.name || '');
    setEditedDescription(habit?.description || '');
    setEditedPriority(habit?.priority || 'Low');
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
      {isEditing ? (
        <>
          <Text style={styles.title}>Editar Hábito</Text>
          <Text style={styles.text}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
          />
          <Text style={styles.text}>Descripción:</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={editedDescription}
            onChangeText={setEditedDescription}
            multiline
          />
          <View style={styles.priorityContainer}>
            <Text style={styles.text}>Prioridad:</Text>
            <TouchableOpacity
              style={[styles.priorityButton, editedPriority === 'High' && styles.selectedHighPriority]}
              onPress={() => setEditedPriority('High')}
            >
              <Text style={styles.priorityButtonText}>High</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.priorityButton, editedPriority === 'Medium' && styles.selectedMediumPriority]}
              onPress={() => setEditedPriority('Medium')}
            >
              <Text style={styles.priorityButtonText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.priorityButton, editedPriority === 'Low' && styles.selectedLowPriority]}
              onPress={() => setEditedPriority('Low')}
            >
              <Text style={styles.priorityButtonText}>Low</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{habit.name}</Text>
          <Text style={styles.text}>Descripción:</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.text}>{habit.description}</Text>
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={styles.deleteButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </>
        )}
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
  descriptionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 15,
    height: 100,
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
    backgroundColor: '#F46B6B',
    padding: 10,
    borderRadius: 100,
  },
  saveButton: {
    backgroundColor: '#84F46B',
    padding: 10,
    borderRadius: 100,
  },
  editButton: {
    backgroundColor: '#0ACDFF',
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 15,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    borderRadius: 15,
  },
});
