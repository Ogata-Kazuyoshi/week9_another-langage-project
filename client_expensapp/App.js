import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import UserScreen from './components/UserScreen';
import { useState } from 'react';
import RateGraph from './components/RateGraph';
import Setting from './components/Setting';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, SetUser] = useState('Ai');
  const [userId, SetUserId] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(10);

  const graphSeed = {
    食費: 1000,
    交際費: 500,
    その他: 300,
    日用品: 100,
  };
  const data2 = Object.keys(graphSeed).map((key) => ({
    x: key,
    y: graphSeed[key],
  }));
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} user={user} userId={userId} />}
        </Stack.Screen>
        <Stack.Screen name="家計簿">
          {(props) => (
            <UserScreen
              {...props}
              user={user}
              userId={userId}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="為替グラフ" component={RateGraph} />
        <Stack.Screen name="設定画面" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
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
