import { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface HabitPillProps {
    label: string;
    priority: 'High' | 'Medium' | 'Low';  // Propiedad de prioridad
    onPress: () => void;  // Función para manejar el evento de clic
}

const HabitPill: React.FC<HabitPillProps> = ({ label, priority, onPress }) => {
    const [checked, setChecked] = useState(false);

    // Mapa de colores basado en la prioridad
    const priorityColors: { [key in 'High' | 'Medium' | 'Low']: string } = {
        High: '#F46B6B',    // Rojo para alta prioridad
        Medium: '#FFBC37',  // Amarillo para media prioridad
        Low: '#84F46B',     // Verde para baja prioridad
    };

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: priorityColors[priority] }]} // Establecer el color de fondo según la prioridad
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{label}</Text>
            <Checkbox
                color='black'
                uncheckedColor='black'
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 16, // Agregar margen horizontal para evitar que toque los bordes
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        flex: 1,
    },
    checkbox: {
        marginLeft: 10,
    },
});

export default HabitPill;
