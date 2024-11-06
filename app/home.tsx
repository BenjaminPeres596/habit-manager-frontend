import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function HomeScreen() {

  const navigation = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>home screen</Text>

        <Button title="add task" onPress={()=>navigation.navigate("/addTask")}></Button>
        <Button title="task details" onPress={()=>navigation.navigate("/taskDetails")}></Button>
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
