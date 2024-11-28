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
        const response = await fetch(`http://${ip}:5000/habits/${id}`,{
            method: 'DELETE',
        });
        if (!response.ok){
            throw new Error(`Failed to delete habit with id: ${id}`);
        }
        console.log(`Habit with id: ${id} deleted successfully`);
        return true;
    }catch (e){
        console.log(e);
        return false;
    }

}