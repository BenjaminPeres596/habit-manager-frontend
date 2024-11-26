import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router'; // Para la navegación en Expo

const AddHabitPill: React.FC = () => {
    const router = useRouter(); // Usamos useRouter para redirigir a la pantalla AddTask

    // Función onPress predefinida para redirigir
    const handlePress = () => {
        router.push('/addTask'); // Redirige a la pantalla AddTask
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonContainer} // Estilo similar al anterior
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16, // Márgenes laterales
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#D9D9D9', // Color de fondo
        borderRadius: 100,
        marginBottom: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 30, // Tamaño del símbolo +
        alignItems: 'center',
    },
});

export default AddHabitPill;