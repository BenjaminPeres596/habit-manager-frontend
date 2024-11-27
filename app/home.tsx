import HabitPill from '@/components/HabitPill';
import AddHabitPill from '@/components/AddHabitPill';
import LogoutButton from '@/components/LogoutButton';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { habitListContext } from '../context/habitContext'; // Adjust the import path as needed

export default function HomeScreen() {
  const navigation = useRouter();

  const context = useContext(habitListContext);

  if (!context) {
    throw new Error('useHabitList must be used within a HabitProvider');
  }

  const { habits, setHabits } = context;

  return (
    <View style={styles.container}>
      <LogoutButton />

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
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    position: 'absolute',
    top: 80,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    marginTop: 16,
  },
});
