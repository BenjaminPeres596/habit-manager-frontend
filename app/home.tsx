import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { habitListContext } from '../context/habitContext'; // Adjust the import path as needed
import HabitPill from '@/components/HabitPill';
import AddHabitPill from '@/components/AddHabitPill';
import LogoutButton from '@/components/LogoutButton';

export default function HomeScreen() {
  const navigation = useRouter();
  const context = useContext(habitListContext);

  if (!context) {
    throw new Error('useHabitList must be used within a HabitProvider');
  }

  const { habits, setHabits } = context;

  return (
    <View style={styles.container}>
      <LogoutButton style={styles.logoutButton} />
      <Text style={styles.title}>TP3 Móviles Gupo XX</Text>
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Aca iría el filtro</Text>
        {habits.map((habit) => (
          <HabitPill
            key={habit.id}
            habit={habit}
            onPress={() => navigation.navigate({ pathname: '/habitDetails', params: { id: habit.id } })}
          />
        ))}
        <AddHabitPill />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Add padding to avoid overlap with the status bar
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});