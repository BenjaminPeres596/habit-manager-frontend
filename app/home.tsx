import ActivityPill from '@/components/ActivityPill';
import AddActivityPill from '@/components/AddActivityPill';
import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function HomeScreen() {

  const navigation = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TP3 Móviles Gupo XX</Text>

      <View style={styles.mainContainer}>

        <Text style={styles.text}>Aca iría el filtro</Text>

        <ActivityPill
          label="Important Task"
          priority="high" // Puedes cambiar esto a 'medium' o 'low'
          onPress={() => navigation.navigate("/taskDetails")}
        /><ActivityPill
          label="Important Task"
          priority="medium" // Puedes cambiar esto a 'medium' o 'low'
          onPress={() => navigation.navigate("/taskDetails")}
        /><ActivityPill
          label="Important Task"
          priority="low" // Puedes cambiar esto a 'medium' o 'low'
          onPress={() => navigation.navigate("/taskDetails")}
        />
        <AddActivityPill />

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
