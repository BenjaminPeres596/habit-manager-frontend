import { Habit } from '@/types/types';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { getHabits } from '@/services/habit';

interface HabitContextType {
    habits: Habit[];
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

export const habitListContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        async function fetchHabits() {
            try {
                const response = await getHabits();
                const formattedHabits = response.map((habit: any) => ({
                    id: habit.id,
                    name: habit.name,
                    priority: habit.priority === 0 ? 'High' : habit.priority === 1 ? 'Medium' : 'Low',
                    completed: false, // Assuming the completed status is not provided in the response
                    description: habit.description,
                }));
                setHabits(formattedHabits);
            } catch (error) {
                console.error('Failed to fetch habits:', error);
            }
        }

        fetchHabits();
    }, []);

    return (
        <habitListContext.Provider value={{ habits, setHabits }}>
            {children}
        </habitListContext.Provider>
    );
};