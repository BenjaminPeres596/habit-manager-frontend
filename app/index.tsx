import { Image, StyleSheet, Platform, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import Profile from '@/components/Profile'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';

export default function LoginScreen() {

  const navigation = useRouter();

  const auth0 = useAuth0();
  
  if (auth0.user) {
    navigation.replace("/home");
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <LoginButton />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Profile />
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
