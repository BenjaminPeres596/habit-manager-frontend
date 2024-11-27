import { useEffect, useState, useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Habit } from '@/types/types';
import { habitListContext } from '@/context/habitContext';

interface HabitPillProps {
    habit: Habit;
    onPress: () => void;
}

const HabitPill: React.FC<HabitPillProps> = ({ habit, onPress }) => {

    const habits = useContext(habitListContext);

    const { id, name, priority, completed } = habit;

    const [checked, setChecked] = useState(completed);

    useEffect(() => {
        const index = habits.findIndex((h) => h.id === habit.id);
        if (index !== -1) {
            habits[index].completed = checked;
        }
    }, [checked]);

    // Mapa de colores basado en la prioridad
    const priorityColors: { [key in 'High' | 'Medium' | 'Low']: string } = {
        High: '#F46B6B',
        Medium: '#FFBC37',
        Low: '#84F46B',
    };

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: priorityColors[priority] }]} // Establecer el color de fondo según la prioridad
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{name}</Text>
            
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
