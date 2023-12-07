import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dbApi from './api/dbApi';
import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Button title="GetAll" onPress={getAllHandler} />
    //   <Button title="GetSingle" onPress={getSingleHandler} />
    //   <Button title="NewPost" onPress={createNewHandler} />
    //   <Button title="Update" onPress={updateHandler} />
    //   <Button title="delete" onPress={deleteHandler} />
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
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
