import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LoginButton from '@/components/LoginButton';
import { useRouter } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';

export default function LoginScreen() {
  const navigation = useRouter();
  const auth0 = useAuth0();

  if (auth0.user) {
    navigation.replace('/home');
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Habit Manager
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Organiza tus hábitos y transforma tu rutina.
        </ThemedText>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <LoginButton/>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fondo claro
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7F8C8D',
  },
  content: {
    alignItems: 'center',
  },
});
