import { Habit } from '@/types/types';
import { createContext } from 'react';

const initialHabitList: Habit[] = [
    { id: 1, name: 'Ejercicio', priority: 'High', completed: false },
    { id: 2, name: 'Tarea', priority: 'Medium', completed: true },
    { id: 3, name: 'Estudiar', priority: 'Low', completed: false },
];

export let habitListContext = createContext<Habit[]>(initialHabitList);