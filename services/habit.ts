export const getHabits = async () => {
    console.log("Fetching habits...");
    try {
        // Add the code to fetch habits from the server
        console.log("Fetching habits...");
        const response = await fetch('http://192.168.0.38:5000/habits'); // la ip de cada uno
        console.log("Response:", response);
        const habits = await response.json();
        console.log("Habits:", habits);
        return habits;
    } catch (e) {
        console.log(e);
        return false;
    }
};