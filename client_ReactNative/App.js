import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import dbApi from './api/dbApi';

export default function App() {
  const getAllHandler = async () => {
    const res = await dbApi.getDB();
    console.log('resAll : ', res.data);
  };
  return (
    <View style={styles.container}>
      <Button title="GetAll" onPress={getAllHandler} />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
