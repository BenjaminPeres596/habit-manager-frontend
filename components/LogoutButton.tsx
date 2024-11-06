import React from 'react';
import { Button } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useAuth } from '@/hooks/authContext';

const LogoutButton = () => {
    const {clearSession} = useAuth0();
    const { clearToken } = useAuth();

    const onPress = async () => {
        try {
            await clearSession();
            clearToken();
            console.log("Logged out successfully");
        } catch (e) {
            console.log("Error during logout:", e);
        }
    };

    return <Button onPress={onPress} title="Log out" />
}

export default LogoutButton;
