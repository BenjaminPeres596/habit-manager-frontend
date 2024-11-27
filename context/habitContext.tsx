import { Habit } from '@/types/types';
import { createContext, useState, ReactNode } from 'react';

const initialHabitList: Habit[] = [
    { id: 1, name: 'Ejercicio', priority: 'High', completed: false },
    { id: 2, name: 'Tarea', priority: 'Medium', completed: true },
    { id: 3, name: 'Estudiar', priority: 'Low', completed: false },
];

interface HabitContextType {
    habits: Habit[];
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

export const habitListContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [habits, setHabits] = useState(initialHabitList);

    return (
        <habitListContext.Provider value={{ habits, setHabits }}>
            {children}
        </habitListContext.Provider>
    );
};