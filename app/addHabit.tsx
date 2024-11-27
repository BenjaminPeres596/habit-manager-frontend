import { Text, View, StyleSheet, Button } from 'react-native';

function handleNewHabit() {
  console.log('Add habit button pressed');
}

export default function addTaskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>add task screen</Text>
      <Button title="agregar hábito" onPress={handleNewHabit}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
