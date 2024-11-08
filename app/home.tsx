import ActivityPill from '@/components/ActivityPill';
import AddActivityPill from '@/components/AddActivityPill';
import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function HomeScreen() {

  const navigation = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>home screen</Text>

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
