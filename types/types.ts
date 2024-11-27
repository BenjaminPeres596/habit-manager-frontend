// types.ts

export interface Habit {
    id: number;
    name: string;
    priority: 'High' | 'Medium' | 'Low'; // Puedes ajustar estos valores si lo necesitas
    completed: boolean;
    description: string;
}