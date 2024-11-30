import useIp from "@/hooks/useip";

const { ip } = useIp();

export const getHabits = async () => {
    console.log("Fetching habits...");
    try {
        // Add the code to fetch habits from the server
        console.log("Fetching habits...");
        const response = await fetch(`http://${ip}:5000/habits`); // la ip de cada uno
        console.log("Response:", response);
        const habits = await response.json();
        console.log("Habits:", habits);
        return habits;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const deleteHabit = async (id: number) => {
    console.log(`Deleting habit whit id: ${id}`)
    try {
        const response = await fetch(`http://${ip}:5000/habits/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete habit with id: ${id}`);
        }
        console.log(`Habit with id: ${id} deleted successfully`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

}

export const createHabit = async (name: string, priority: 'High' | 'Medium' | 'Low', description: string) => {
    console.log("Creating new Habit")

    const newPriority = priority === 'High' ? '0' : priority === 'Medium' ? '1' : '2';

    try {
        const response = await fetch(`http://${ip}:5000/habits/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "priority": newPriority,
                "description": description,
                "user_id": 1
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to create habit');
        }
        const data = await response.json();
        console.log('Habit created successfully');
        const id = data.id
        return id;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const changeHabitState = async (id: number) => {

    console.log(`Changing status of habit with id: ${id}`);

    try {
        const response = await fetch(`http://${ip}:5000/habits/${id}/changeStatus`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error(`Failed to change status of habit with id: ${id}`);
        }
        console.log(`Status of habit with id: ${id} changed successfully`);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

export const updateHabit = async (id: number, name: string, priority: 'High' | 'Medium' | 'Low', description: string) => {

    console.log(`Updating habit with id: ${id}`);
    
    const newPriority = priority === 'High' ? '0' : priority === 'Medium' ? '1' : '2';

    console.log(`New name: ${name}`);
    console.log(`New priority: ${newPriority}`);
    console.log(`New description: ${description}`);


    try {
        const response = await fetch(`http://${ip}:5000/habits/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "priority": newPriority,
                "description": description,
            }),
        });
        if (!response.ok){
            throw new Error(`Failed to update habit with id: ${id}`);
        }
        console.log(`Habit with id: ${id} updated successfully`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}