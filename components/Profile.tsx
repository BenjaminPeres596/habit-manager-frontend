import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

// Define the component with typing for TypeScript
const Profile: React.FC = () => {
  const { user, error } = useAuth0();

  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.text}>Logged in as {user.name}</Text>
      ) : (
        <Text style={styles.text}>Not logged in</Text>
      )}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
  },
  errorText: {
    color: 'red',
  },
});

// Export the Profile component
export default Profile;
