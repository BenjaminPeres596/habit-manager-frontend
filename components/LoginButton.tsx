import React from 'react';
import { Button } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';

const LoginButton = () => {
  const navigation = useRouter();  // Add this to get the navigation object

  const auth0 = useAuth0();
  console.log("Auth0 Instance:", auth0);  // Add this to check if auth0 is defined    
  const { saveToken } = useAuth();  // Add this to get the saveToken function from the authContext

  const onPress = async () => {
    try {
      if (auth0?.authorize) {
        await auth0.authorize();
        const credentials = await auth0.getCredentials();
        saveToken(credentials?.accessToken);  // Add this to save the token to the context

        if (credentials) {
          console.log("Logged in successfully");
          navigation.replace("/home");  // Add this to navigate to the home screen
        }

      } else {
        console.log("Auth0 instance is not available.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log in" />;
};

export default LoginButton;
