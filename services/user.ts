import useIp from "@/hooks/useip";
import { User } from "react-native-auth0";

const { ip } = useIp();

export const getUserByEmail = async (email?: string) => {

    console.log(`Getting user with email: ${email}`);

    try {
        const response = await fetch(`http://${ip}:5000/users/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
            }),
        });
        if (!response.ok) {
            throw new Error(`Failed to get User with email: ${email}`);
        }
        const data = await response.json();
        const user: User = {
            id: data.id,
            name: data.name,
            email: data.email,
            lastName: data.lastName,
          };
        return user;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}