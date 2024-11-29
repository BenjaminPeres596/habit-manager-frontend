import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth0 } from 'react-native-auth0';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';

interface LogoutButtonProps {
  style?: ViewStyle;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ style }) => {
  const navigator = useRouter();
  const { clearSession } = useAuth0();
  const { clearToken } = useAuth();

  const onPress = async () => {
    try {
      await clearSession();
      clearToken();
      console.log("Logged out successfully");
      navigator.replace("/");
    } catch (e) {
      console.log("Error during logout:", e);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Icon name="sign-out" size={24} color="#F46B6B" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default LogoutButton;
